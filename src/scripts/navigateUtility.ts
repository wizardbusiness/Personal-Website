const scrollToPage = async (e: WheelEvent) => {
  // view transitions in astro only work if link is clicked, so we make scrolling click the link.
  const scrollBtn = document.querySelectorAll(
    '[data-scroll-btn]',
  )[0] as HTMLElement
  const direction = scrollBtn.dataset.scrollBtn

  if (direction === 'down' && e.deltaY < 0) {
    const subheader = document.querySelectorAll('[data-subheader-landing]')[0]
    subheader.classList.add('animate-fall-from')
    subheader.addEventListener('animationend', () => {
      scrollBtn.click()
    })
  }
  if (direction === 'up' && e.deltaY > 0) {
    const subheaderMain = document.querySelectorAll('[data-subheader-main]')[0]
    subheaderMain.classList.add('animate-rise-from')
    await subheaderMain.addEventListener('animationend', () => {
      scrollBtn.click()
      // subheaderLanding.addEventListener
    })

    //
  }

  return
}

const scrollContainer = document.querySelectorAll('html')[0]
scrollContainer.addEventListener('wheel', (e) => scrollToPage(e))
