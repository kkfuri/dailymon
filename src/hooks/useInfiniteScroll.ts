import { useEffect } from 'react'

const useInfiniteScroll = (callback) => {
  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    if (scrollTop + window.innerHeight + 120 >= scrollHeight) {
      if (typeof callback === 'function') callback()
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

export default useInfiniteScroll
