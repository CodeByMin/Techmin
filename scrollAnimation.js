document.addEventListener('scroll', function() {
    const resumeSection = document.getElementById('resume');
    const statsSection = document.getElementById('stats');

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Fade in Resume Section when in view
    if (isInViewport(resumeSection)) {
        resumeSection.classList.add('fade-in');
    }

    // Slide in stats from right to left when in view
    if (isInViewport(statsSection)) {
        statsSection.classList.add('show');
    }
});
