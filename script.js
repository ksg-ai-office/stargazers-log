const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium"
  }).format(new Date(`${dateString}T00:00:00`));
}

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  repositories.forEach((repository) => {
    const item = document.createElement("li");
    item.className = "repository";

    const link = document.createElement("a");
    link.className = "repository-link";
    link.href = repository.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = repository.repository;

    const description = document.createElement("p");
    description.className = "repository-description";
    description.textContent = repository.description;

    const metadata = document.createElement("p");
    metadata.className = "repository-meta";
    const language = document.createElement("span");
    language.textContent = `★ ${repository.language}`;
    const starredDate = document.createElement("span");
    starredDate.textContent = `Starred ${formatDate(repository.starredAt)}`;
    metadata.append(language, starredDate);

    item.append(link, description, metadata);
    repositoryList.append(item);
  });

  status.textContent = `${repositories.length} repositories`;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    status.classList.add("error");
    status.textContent = "Unable to load starred repositories.";
    console.error("Unable to load events.json:", error);
  }
}

loadRepositories();
