// fetch.js
async function fetchGithubContent() {
    const loading = document.getElementById('loading');
    const featuredContent = document.getElementById('featured-content');
    
    try {
        loading.style.display = 'block';
        const response = await fetch(`https://api.github.com/repos/Niketkumardheeryan/ML-CaPsule/contents`);
        const data = await response.json();
        displayContent(data);
    } catch (error) {
        featuredContent.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger">
                    Failed to load content. Please try again later.
                </div>
            </div>`;
    } finally {
        loading.style.display = 'none';
    }
}

function displayContent(data) {
    const featuredContent = document.getElementById('featured-content');
    
    const items = data
        .filter(item => item.type === 'file' && item.name.endsWith('.md'))
        .map((item, index) => `
            <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${item.name.replace('.md', '')}</h5>
                        <p class="card-text">Explore detailed machine learning concepts and tutorials.</p>
                        <a href="${item.html_url}" target="_blank" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
            </div>
        `).join('');

    featuredContent.innerHTML = items || `
        <div class="col-12 text-center">
            <p class="text-muted">No content available at the moment.</p>
        </div>`;
}