// Enhanced Blog functionality for DARC OMNIVERSE
class BlogManager {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.articlesPerPage = 6;
        this.isLoading = false;
        
        this.init();
        this.loadSampleArticles();
        this.bindEvents();
    }

    init() {
        // Get DOM elements
        this.blogGrid = document.getElementById('blog-grid');
        this.searchInput = document.getElementById('blog-search');
        this.searchBtn = document.querySelector('.search-btn');
        this.filterTabs = document.querySelectorAll('.filter-tab');
        this.loadMoreBtn = document.getElementById('load-more');
        this.newsletterForm = document.getElementById('newsletter-form');
        this.articleModal = document.getElementById('article-modal');
        this.modalBody = document.getElementById('modal-body');
        this.modalClose = document.getElementById('modal-close');
        this.modalOverlay = document.getElementById('modal-overlay');
        
        // Initialize search debounce
        this.searchDebounce = this.debounce(this.handleSearch.bind(this), 300);
    }

    loadSampleArticles() {
        // Sample articles data - in production, this would come from an API
        this.articles = [
            {
                id: 1,
                title: "Building Smart Fire Detection Systems with IoT",
                excerpt: "Learn how Internet of Things technology is revolutionizing fire safety with real-time monitoring and automated response systems.",
                content: this.generateArticleContent("fire-detection"),
                category: "technology",
                date: "2024-12-10",
                readTime: "8 min read",
                author: "DARC Tech Team",
                featured: false
            },
            {
                id: 2,
                title: "Solar Power Revolution: Making Sustainable Energy Accessible",
                excerpt: "Discover how affordable solar solutions are transforming homes and reducing carbon footprints across Nigeria.",
                content: this.generateArticleContent("solar-power"),
                category: "innovation",
                date: "2024-12-08",
                readTime: "6 min read",
                author: "Energy Solutions Team",
                featured: false
            },
            {
                id: 3,
                title: "The Psychology of UI/UX Design in African Markets",
                excerpt: "Understanding cultural nuances and user behavior patterns to create more effective digital experiences.",
                content: this.generateArticleContent("ux-design"),
                category: "design",
                date: "2024-12-05",
                readTime: "10 min read",
                author: "DARC Design Team",
                featured: false
            },
            {
                id: 4,
                title: "Python Programming for Beginners: Complete Roadmap",
                excerpt: "A comprehensive guide to learning Python programming from zero to building real-world applications.",
                content: this.generateArticleContent("python-tutorial"),
                category: "education",
                date: "2024-12-03",
                readTime: "15 min read",
                author: "Helix Academy",
                featured: false
            },
            {
                id: 5,
                title: "Smart Home Automation: Future of Living",
                excerpt: "Exploring the latest trends in home automation and how they're reshaping modern living experiences.",
                content: this.generateArticleContent("smart-home"),
                category: "technology",
                date: "2024-12-01",
                readTime: "7 min read",
                author: "Innovation Team",
                featured: false
            },
            {
                id: 6,
                title: "Creating Effective Brand Identity in the Digital Age",
                excerpt: "Learn the essential elements of building a strong brand presence that resonates with your target audience.",
                content: this.generateArticleContent("brand-identity"),
                category: "design",
                date: "2024-11-28",
                readTime: "9 min read",
                author: "Creative Director",
                featured: false
            },
            {
                id: 7,
                title: "Machine Learning Fundamentals for Entrepreneurs",
                excerpt: "Understanding how AI and machine learning can transform your business operations and decision-making.",
                content: this.generateArticleContent("machine-learning"),
                category: "tutorials",
                date: "2024-11-25",
                readTime: "12 min read",
                author: "AI Research Team",
                featured: false
            },
            {
                id: 8,
                title: "Sustainable Technology Solutions for Africa",
                excerpt: "Examining innovative tech solutions that address environmental challenges while fostering economic growth.",
                content: this.generateArticleContent("sustainable-tech"),
                category: "innovation",
                date: "2024-11-22",
                readTime: "11 min read",
                author: "Sustainability Team",
                featured: false
            }
        ];

        this.filteredArticles = [...this.articles];
        this.renderArticles();
    }

    generateArticleContent(topic) {
        const contentTemplates = {
            "fire-detection": `
                <h2>Understanding IoT Fire Detection Systems</h2>
                <p>Fire detection technology has evolved significantly with the integration of Internet of Things (IoT) devices. Modern fire detection systems go beyond traditional smoke alarms to provide comprehensive monitoring and automated response capabilities.</p>
                
                <h3>Key Components of Smart Fire Detection</h3>
                <ul>
                    <li><strong>Multi-sensor Integration:</strong> Combining smoke, heat, and gas sensors for accurate detection</li>
                    <li><strong>Real-time Monitoring:</strong> Continuous monitoring with instant alerts via mobile apps</li>
                    <li><strong>Automated Response:</strong> Integration with sprinkler systems and emergency services</li>
                    <li><strong>Data Analytics:</strong> Historical data analysis for prevention and optimization</li>
                </ul>
                
                <h3>Benefits for Homes and Businesses</h3>
                <p>The implementation of smart fire detection systems offers numerous advantages over conventional methods. These systems provide early warning capabilities, reduce false alarms, and enable remote monitoring even when you're away from the property.</p>
                
                <blockquote>"Smart fire detection systems have reduced false alarms by 70% while improving response times by 50%." - Fire Safety Institute</blockquote>
                
                <h3>Implementation Considerations</h3>
                <p>When planning a smart fire detection system, consider factors such as building layout, power requirements, connectivity options, and integration with existing security systems. Professional installation ensures optimal sensor placement and system configuration.</p>
            `,
            "solar-power": `
                <h2>The Solar Power Revolution in Nigeria</h2>
                <p>Nigeria's abundant sunshine presents tremendous opportunities for solar energy adoption. With an average of 6-7 hours of peak sun daily, solar power systems can significantly reduce electricity costs and improve energy reliability.</p>
                
                <h3>System Components and Design</h3>
                <p>A complete solar power system consists of several key components working together to convert sunlight into usable electricity:</p>
                <ul>
                    <li><strong>Solar Panels:</strong> Photovoltaic cells that convert sunlight to DC electricity</li>
                    <li><strong>Inverter:</strong> Converts DC power to AC power for home appliances</li>
                    <li><strong>Battery Bank:</strong> Stores energy for use during cloudy days or at night</li>
                    <li><strong>Charge Controller:</strong> Regulates battery charging to prevent overcharging</li>
                </ul>
                
                <h3>Cost-Benefit Analysis</h3>
                <p>While the initial investment may seem substantial, solar systems typically pay for themselves within 3-5 years through electricity savings. Government incentives and financing options make solar more accessible than ever.</p>
                
                <h3>Maintenance and Longevity</h3>
                <p>Modern solar systems require minimal maintenance and are designed to last 25+ years. Regular cleaning and periodic inspections ensure optimal performance throughout the system's lifetime.</p>
            `,
            "ux-design": `
                <h2>Cultural Considerations in African UX Design</h2>
                <p>Designing for African markets requires deep understanding of cultural nuances, technological constraints, and user behavior patterns unique to the continent. Successful digital products must account for diverse languages, varying literacy levels, and different technological comfort levels.</p>
                
                <h3>Mobile-First Approach</h3>
                <p>With mobile phones being the primary internet access point for most Africans, designing for mobile-first is not just recommended—it's essential. This means optimizing for smaller screens, slower connections, and touch-based interactions.</p>
                
                <h3>Localization Beyond Language</h3>
                <ul>
                    <li><strong>Visual Design:</strong> Colors, imagery, and symbols that resonate culturally</li>
                    <li><strong>Payment Methods:</strong> Integration with local payment systems and mobile money</li>
                    <li><strong>Content Strategy:</strong> Addressing local needs and challenges</li>
                    <li><strong>Accessibility:</strong> Designing for users with varying technical literacy</li>
                </ul>
                
                <h3>Research and Testing</h3>
                <p>Conducting user research in African markets requires creative approaches. Remote testing, community-based research, and partnerships with local organizations can provide valuable insights into user needs and behaviors.</p>
                
                <blockquote>"Design is not just what it looks like and feels like. Design is how it works—and how it works for different cultures and contexts." - Adapted from Steve Jobs</blockquote>
            `,
            "python-tutorial": `
                <h2>Your Complete Python Programming Journey</h2>
                <p>Python has become one of the most popular programming languages due to its simplicity, versatility, and powerful libraries. Whether you're interested in web development, data science, or automation, Python provides an excellent foundation.</p>
                
                <h3>Why Python?</h3>
                <ul>
                    <li><strong>Readable Syntax:</strong> Python's syntax is close to natural language</li>
                    <li><strong>Versatile Applications:</strong> Web development, AI, data analysis, automation</li>
                    <li><strong>Strong Community:</strong> Extensive documentation and community support</li>
                    <li><strong>Rich Libraries:</strong> Thousands of libraries for various applications</li>
                </ul>
                
                <h3>Learning Path</h3>
                <p>Our structured approach takes you from basics to advanced concepts:</p>
                <ol>
                    <li><strong>Fundamentals:</strong> Variables, data types, control structures</li>
                    <li><strong>Functions and Modules:</strong> Code organization and reusability</li>
                    <li><strong>Object-Oriented Programming:</strong> Classes, inheritance, polymorphism</li>
                    <li><strong>Libraries and Frameworks:</strong> Django, Flask, NumPy, Pandas</li>
                    <li><strong>Projects:</strong> Real-world applications and portfolio building</li>
                </ol>
                
                <h3>Career Opportunities</h3>
                <p>Python developers are in high demand across various industries. From startup to enterprise companies, Python skills open doors to exciting career opportunities in software development, data science, and emerging technologies.</p>
            `,
            "smart-home": `
                <h2>The Evolution of Smart Home Technology</h2>
                <p>Smart home automation represents the convergence of Internet of Things (IoT), artificial intelligence, and user-centric design. Today's smart homes can learn from user behavior, anticipate needs, and optimize energy consumption automatically.</p>
                
                <h3>Core Smart Home Systems</h3>
                <ul>
                    <li><strong>Lighting Control:</strong> Automated lighting based on occupancy and time</li>
                    <li><strong>Climate Management:</strong> Smart thermostats and HVAC optimization</li>
                    <li><strong>Security Systems:</strong> Integrated cameras, sensors, and access control</li>
                    <li><strong>Entertainment:</strong> Multi-room audio and automated media systems</li>
                </ul>
                
                <h3>Energy Efficiency Benefits</h3>
                <p>Smart home systems can reduce energy consumption by 10-15% through intelligent automation. Features like occupancy sensing, automated scheduling, and energy monitoring help homeowners make informed decisions about their energy usage.</p>
                
                <h3>Future Trends</h3>
                <p>The future of smart homes includes increased AI integration, better interoperability between devices, and more sophisticated predictive capabilities. Voice control and gesture recognition will become more natural and intuitive.</p>
            `,
            "brand-identity": `
                <h2>Building Strong Brand Identity in Digital Spaces</h2>
                <p>In today's digital-first world, brand identity extends far beyond traditional logos and color schemes. A comprehensive brand identity encompasses visual design, voice, personality, and the entire user experience across all touchpoints.</p>
                
                <h3>Elements of Digital Brand Identity</h3>
                <ul>
                    <li><strong>Visual Identity:</strong> Logo, typography, color palette, imagery style</li>
                    <li><strong>Brand Voice:</strong> Tone, personality, and communication style</li>
                    <li><strong>User Experience:</strong> How users interact with your brand digitally</li>
                    <li><strong>Content Strategy:</strong> What you say and how you say it</li>
                </ul>
                
                <h3>Consistency Across Platforms</h3>
                <p>Maintaining brand consistency across websites, social media, mobile apps, and other digital platforms is crucial for building recognition and trust. Develop comprehensive brand guidelines that address all digital touchpoints.</p>
                
                <h3>Measuring Brand Impact</h3>
                <p>Digital platforms provide unprecedented opportunities to measure brand performance through metrics like engagement rates, brand mentions, sentiment analysis, and conversion tracking.</p>
                
                <blockquote>"Your brand is what people say about you when you're not in the room." - Jeff Bezos</blockquote>
            `,
            "machine-learning": `
                <h2>Machine Learning for Business Applications</h2>
                <p>Machine learning is transforming how businesses operate, from customer service automation to predictive analytics. Understanding ML fundamentals helps entrepreneurs identify opportunities and make informed technology investments.</p>
                
                <h3>Types of Machine Learning</h3>
                <ul>
                    <li><strong>Supervised Learning:</strong> Training with labeled data for prediction</li>
                    <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data</li>
                    <li><strong>Reinforcement Learning:</strong> Learning through interaction and feedback</li>
                </ul>
                
                <h3>Business Applications</h3>
                <p>Common business applications include customer segmentation, demand forecasting, fraud detection, recommendation systems, and process automation. Start with well-defined problems and clear success metrics.</p>
                
                <h3>Implementation Strategy</h3>
                <p>Successful ML implementation requires data quality, appropriate algorithms, and continuous monitoring. Consider starting with pre-built solutions before developing custom models.</p>
            `,
            "sustainable-tech": `
                <h2>Technology for Environmental Sustainability</h2>
                <p>Sustainable technology solutions address environmental challenges while creating economic opportunities. From renewable energy to waste management, technology plays a crucial role in building a sustainable future for Africa.</p>
                
                <h3>Green Energy Solutions</h3>
                <p>Solar, wind, and hydroelectric technologies are becoming more affordable and efficient. Distributed energy systems and smart grids enable communities to generate and manage their own clean energy.</p>
                
                <h3>Circular Economy Technologies</h3>
                <ul>
                    <li><strong>Waste-to-Energy:</strong> Converting waste into usable energy</li>
                    <li><strong>Recycling Innovation:</strong> Advanced sorting and processing technologies</li>
                    <li><strong>Resource Optimization:</strong> IoT sensors for resource monitoring</li>
                </ul>
                
                <h3>Economic Impact</h3>
                <p>Sustainable technology creates new job opportunities, reduces operational costs, and opens access to international markets that prioritize environmental responsibility.</p>
            `
        };

        return contentTemplates[topic] || "<p>Article content coming soon...</p>";
    }

    bindEvents() {
        // Search functionality
        this.searchInput?.addEventListener('input', this.searchDebounce);
        this.searchBtn?.addEventListener('click', () => this.handleSearch());

        // Filter tabs
        this.filterTabs?.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Load more button
        this.loadMoreBtn?.addEventListener('click', () => this.loadMoreArticles());

        // Newsletter form
        this.newsletterForm?.addEventListener('submit', (e) => this.handleNewsletter(e));

        // Modal events
        this.modalClose?.addEventListener('click', () => this.closeModal());
        this.modalOverlay?.addEventListener('click', () => this.closeModal());

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.articleModal?.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Delegate click events for article links
        this.blogGrid?.addEventListener('click', (e) => {
            if (e.target.closest('.read-more-btn')) {
                e.preventDefault();
                const articleId = e.target.closest('.read-more-btn').getAttribute('data-article');
                this.openArticle(articleId);
            }
        });
    }

    handleSearch() {
        const query = this.searchInput?.value.toLowerCase() || '';
        
        if (query) {
            this.filteredArticles = this.articles.filter(article => 
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query)
            );
        } else {
            this.filteredArticles = this.currentFilter === 'all' 
                ? [...this.articles] 
                : this.articles.filter(article => article.category === this.currentFilter);
        }

        this.currentPage = 1;
        this.renderArticles(true);
        this.highlightSearchTerms(query);
    }

    handleFilter(e) {
        e.preventDefault();
        const filter = e.target.getAttribute('data-category');
        
        // Update active tab
        this.filterTabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentFilter = filter;
        this.currentPage = 1;
        
        // Filter articles
        if (filter === 'all') {
            this.filteredArticles = [...this.articles];
        } else {
            this.filteredArticles = this.articles.filter(article => article.category === filter);
        }
        
        // Apply search if active
        const query = this.searchInput?.value.toLowerCase() || '';
        if (query) {
            this.filteredArticles = this.filteredArticles.filter(article => 
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query)
            );
        }
        
        this.renderArticles(true);
        this.highlightSearchTerms(query);
    }

    renderArticles(reset = false) {
        if (!this.blogGrid) return;

        if (reset) {
            this.blogGrid.innerHTML = '';
        }

        const startIndex = (this.currentPage - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);

        if (articlesToShow.length === 0 && reset) {
            this.blogGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No articles found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            this.updateLoadMoreButton(false);
            return;
        }

        articlesToShow.forEach((article, index) => {
            const articleCard = this.createArticleCard(article);
            this.blogGrid.appendChild(articleCard);
            
            // Animate in
            setTimeout(() => {
                articleCard.classList.add('show');
            }, index * 100);
        });

        // Update load more button
        const hasMore = endIndex < this.filteredArticles.length;
        this.updateLoadMoreButton(hasMore);
    }

    createArticleCard(article) {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-card-image">
                <div class="blog-card-placeholder">
                    <i class="fas ${this.getCategoryIcon(article.category)}"></i>
                </div>
                <div class="blog-card-category ${article.category}">${this.formatCategory(article.category)}</div>
            </div>
            <div class="blog-card-content">
                <h3 class="blog-card-title">${article.title}</h3>
                <p class="blog-card-excerpt">${article.excerpt}</p>
                <div class="blog-card-meta">
                    <span class="blog-card-date">
                        <i class="fas fa-calendar"></i>
                        ${this.formatDate(article.date)}
                    </span>
                    <span class="blog-card-readtime">
                        <i class="fas fa-clock"></i>
                        ${article.readTime}
                    </span>
                </div>
                <a href="#" class="blog-card-link read-more-btn" data-article="${article.id}">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        return card;
    }

    getCategoryIcon(category) {
        const icons = {
            technology: 'fa-microchip',
            design: 'fa-palette',
            education: 'fa-graduation-cap',
            innovation: 'fa-lightbulb',
            tutorials: 'fa-code'
        };
        return icons[category] || 'fa-file-alt';
    }

    formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    highlightSearchTerms(query) {
        if (!query) return;

        const cards = this.blogGrid?.querySelectorAll('.blog-card-title, .blog-card-excerpt');
        cards?.forEach(element => {
            const text = element.textContent;
            const highlightedText = text.replace(
                new RegExp(`(${query})`, 'gi'),
                '<span class="search-highlight">$1</span>'
            );
            element.innerHTML = highlightedText;
        });
    }

    loadMoreArticles() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.loadMoreBtn.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            this.currentPage++;
            this.renderArticles();
            this.isLoading = false;
            this.loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Articles';
            this.loadMoreBtn.disabled = false;
        }, 1000);
    }

    updateLoadMoreButton(hasMore) {
        if (!this.loadMoreBtn) return;
        
        if (hasMore) {
            this.loadMoreBtn.style.display = 'inline-flex';
        } else {
            this.loadMoreBtn.style.display = 'none';
        }
    }

    openArticle(articleId) {
        const article = this.articles.find(a => a.id == articleId) || this.getFeaturedArticle();
        if (!article || !this.articleModal || !this.modalBody) return;

        this.modalBody.innerHTML = `
            <div class="article-header">
                <h1 class="article-title">${article.title}</h1>
                <div class="article-meta">
                    <span class="category ${article.category}">${this.formatCategory(article.category)}</span>
                    <span class="date">
                        <i class="fas fa-calendar"></i>
                        ${this.formatDate(article.date)}
                    </span>
                    <span class="readtime">
                        <i class="fas fa-clock"></i>
                        ${article.readTime}
                    </span>
                    <span class="author">
                        <i class="fas fa-user"></i>
                        ${article.author}
                    </span>
                </div>
            </div>
            <div class="article-content">
                ${article.content}
            </div>
        `;

        this.articleModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add scroll to top button for modal
        this.addModalScrollToTop();
    }

    getFeaturedArticle() {
        return {
            id: 'featured',
            title: "The Future of Home Automation: How DARC TECH is Revolutionizing Smart Living",
            content: `
                <h2>Introduction to Smart Living</h2>
                <p>The concept of smart homes has evolved from science fiction to everyday reality. At DARC TECH, we're at the forefront of this revolution, creating innovative solutions that transform ordinary homes into intelligent living spaces.</p>
                
                <h3>Our Smart Home Ecosystem</h3>
                <p>Our comprehensive approach to home automation includes:</p>
                <ul>
                    <li><strong>Fire Detection Systems:</strong> Advanced sensors with real-time monitoring and automated emergency response</li>
                    <li><strong>Solar Power Integration:</strong> Sustainable energy solutions that reduce costs and environmental impact</li>
                    <li><strong>Automated Door Systems:</strong> Smart access control with remote monitoring and security features</li>
                    <li><strong>DARC DESC:</strong> Our revolutionary smart desk that integrates wireless charging, LED lighting, and productivity features</li>
                    <li><strong>NRG Bed:</strong> Intelligent furniture that combines comfort with technology for the modern bedroom</li>
                </ul>
                
                <h3>The Technology Behind the Magic</h3>
                <p>Our systems leverage cutting-edge technologies including IoT sensors, machine learning algorithms, and cloud computing to create seamless user experiences. Each component is designed to work independently while contributing to the overall smart home ecosystem.</p>
                
                <blockquote>"Smart homes aren't just about convenience—they're about creating spaces that understand and adapt to human needs." - DARC TECH Innovation Team</blockquote>
                
                <h3>Real-World Impact</h3>
                <p>Our clients report significant improvements in energy efficiency, security, and quality of life. The integration of smart technologies has resulted in:</p>
                <ul>
                    <li>30-40% reduction in energy consumption</li>
                    <li>Enhanced security with 24/7 monitoring capabilities</li>
                    <li>Improved convenience through automation and remote control</li>
                    <li>Increased property value and modern appeal</li>
                </ul>
                
                <h3>The Future of Smart Living</h3>
                <p>As we look ahead, we're developing even more innovative solutions that will further enhance the smart home experience. Our research and development team is working on AI-powered predictive systems, advanced biometric security, and seamless integration with renewable energy sources.</p>
                
                <p>The future of home automation is bright, and DARC TECH is committed to leading this transformation while making smart living accessible and affordable for everyone.</p>
            `,
            category: "technology",
            date: "2024-12-15",
            readTime: "12 min read",
            author: "DARC Team"
        };
    }

    closeModal() {
        if (!this.articleModal) return;
        
        this.articleModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Remove modal scroll to top button
        const scrollTopBtn = this.articleModal.querySelector('.modal-scroll-top');
        if (scrollTopBtn) {
            scrollTopBtn.remove();
        }
    }

    addModalScrollToTop() {
        // Remove existing button
        const existingBtn = this.articleModal.querySelector('.modal-scroll-top');
        if (existingBtn) {
            existingBtn.remove();
        }

        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'modal-scroll-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        
        scrollTopBtn.addEventListener('click', () => {
            this.modalBody.scrollTo({ top: 0, behavior: 'smooth' });
        });

        this.articleModal.appendChild(scrollTopBtn);

        // Show/hide based on scroll position
        this.modalBody.addEventListener('scroll', () => {
            if (this.modalBody.scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
    }

    handleNewsletter(e) {
        e.preventDefault();
        
        const formData = new FormData(this.newsletterForm);
        const email = formData.get('email');
        
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        this.showNotification('Thank you for subscribing to our newsletter!', 'success');
        this.newsletterForm.reset();
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'hsl(var(--success-color))' : type === 'error' ? 'hsl(var(--error-color))' : 'hsl(var(--primary-color))'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 2001;
            opacity: 0;
            transform: translateX(100%);
            transition: var(--transition);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize blog when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// Handle featured article read more button
document.addEventListener('click', (e) => {
    if (e.target.closest('.read-more-btn[data-article="featured"]')) {
        e.preventDefault();
        // This will be handled by the BlogManager instance
        const blogManager = new BlogManager();
        blogManager.openArticle('featured');
    }
});
