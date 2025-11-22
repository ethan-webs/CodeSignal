// CodeSignal Interactive Code Editor
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the code editor
    initializeCodeEditor();
    
    // Add smooth scrolling for navigation links
    addSmoothScrolling();
    
    // Add interactive features
    addInteractiveFeatures();
});

function initializeCodeEditor() {
    const codeEditor = document.getElementById('codeEditor');
    const codeOutput = document.getElementById('codeOutput');
    
    if (!codeEditor || !codeOutput) return;
    
    // Make the code editor editable
    codeEditor.setAttribute('contenteditable', 'true');
    codeEditor.style.outline = 'none';
    
    // Add syntax highlighting
    addSyntaxHighlighting(codeEditor);
    
    // Add run button functionality
    const runButton = document.querySelector('.editor-controls i');
    if (runButton) {
        runButton.addEventListener('click', function() {
            runCode();
        });
    }
    
    // Add tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this);
        });
    });
}

function addSyntaxHighlighting(element) {
    // Simple syntax highlighting for JavaScript
    const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'new', 'Map', 'console', 'log'];
    const strings = /"[^"]*"/g;
    const comments = /\/\/.*$/gm;
    const numbers = /\b\d+\b/g;
    const functions = /\b\w+(?=\()/g;
    
    element.addEventListener('input', function() {
        let content = this.textContent;
        
        // Reset content
        this.innerHTML = content;
        
        // Apply syntax highlighting
        this.innerHTML = this.innerHTML
            .replace(comments, '<span class="comment">$&</span>')
            .replace(strings, '<span class="string">$&</span>')
            .replace(numbers, '<span class="number">$&</span>')
            .replace(functions, '<span class="function">$&</span>');
        
        // Highlight keywords
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            this.innerHTML = this.innerHTML.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
    });
    
    // Trigger initial highlighting
    element.dispatchEvent(new Event('input'));
}

function runCode() {
    const codeEditor = document.getElementById('codeEditor');
    const codeOutput = document.getElementById('codeOutput');
    
    if (!codeEditor || !codeOutput) return;
    
    // Get the code content
    const code = codeEditor.textContent;
    
    // Create a simple JavaScript runner
    try {
        // Capture console.log output
        const originalLog = console.log;
        let output = '';
        
        console.log = function(...args) {
            output += args.join(' ') + '\n';
            originalLog.apply(console, args);
        };
        
        // Execute the code
        eval(code);
        
        // Restore console.log
        console.log = originalLog;
        
        // Display output
        codeOutput.textContent = output || 'No output';
        
        // Add success animation
        codeOutput.style.color = '#6A9955';
        setTimeout(() => {
            codeOutput.style.color = '#D4D4D4';
        }, 1000);
        
    } catch (error) {
        codeOutput.textContent = `Error: ${error.message}`;
        codeOutput.style.color = '#F44747';
        setTimeout(() => {
            codeOutput.style.color = '#D4D4D4';
        }, 2000);
    }
}

function switchTab(clickedTab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');
    
    // Add tab switching animation
    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
        codeEditor.style.opacity = '0.5';
        setTimeout(() => {
            codeEditor.style.opacity = '1';
        }, 150);
    }
}

function addSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addInteractiveFeatures() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add scroll animations
    addScrollAnimations();
}

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .logo-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add keyboard shortcuts for code editor
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to run code
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
    }
    
    // Tab key handling in code editor
    if (e.key === 'Tab' && e.target.contentEditable === 'true') {
        e.preventDefault();
        document.execCommand('insertText', false, '    '); // Insert 4 spaces
    }
});

// Add code editor line numbers (optional enhancement)
function addLineNumbers() {
    const codeEditor = document.getElementById('codeEditor');
    if (!codeEditor) return;
    
    const lines = codeEditor.textContent.split('\n');
    const lineNumbers = lines.map((_, index) => index + 1).join('\n');
    
    // This would require restructuring the HTML to have a separate line numbers column
    // For now, we'll keep it simple with the current implementation
}

// Add auto-save functionality (localStorage)
function autoSave() {
    const codeEditor = document.getElementById('codeEditor');
    if (!codeEditor) return;
    
    // Save to localStorage
    localStorage.setItem('codesignal-demo-code', codeEditor.textContent);
}

function loadSavedCode() {
    const codeEditor = document.getElementById('codeEditor');
    if (!codeEditor) return;
    
    const savedCode = localStorage.getItem('codesignal-demo-code');
    if (savedCode) {
        codeEditor.textContent = savedCode;
        // Trigger syntax highlighting
        codeEditor.dispatchEvent(new Event('input'));
    }
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', function() {
    loadSavedCode();
    
    const codeEditor = document.getElementById('codeEditor');
    if (codeEditor) {
        codeEditor.addEventListener('input', autoSave);
    }
});

// Add demo data cycling for company logos
function cycleCompanyLogos() {
    const logos = ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Uber', 'Airbnb', 'Stripe', 'Slack'];
    const logoItems = document.querySelectorAll('.logo-item');
    
    let currentIndex = 0;
    
    setInterval(() => {
        logoItems.forEach((item, index) => {
            const logoIndex = (currentIndex + index) % logos.length;
            item.textContent = logos[logoIndex];
        });
        currentIndex = (currentIndex + 1) % logos.length;
    }, 3000);
}

// Initialize logo cycling
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(cycleCompanyLogos, 2000);
});
