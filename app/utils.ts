export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; // Offset for the fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    // Custom ease-in scrolling implementation
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 800; // Duration in milliseconds
    let start: number | null = null;
    
    const easeIn = (t: number): number => {
      // Ease-in function: t^2
      return t * t;
    };
    
    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Apply ease-in function
      const easedProgress = easeIn(progress);
      
      // Calculate new position
      const newPosition = startPosition + (distance * easedProgress);
      window.scrollTo(0, newPosition);
      
      // Continue animation if not complete
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }
} 