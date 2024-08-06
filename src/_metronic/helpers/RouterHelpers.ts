export function getCurrentUrl(pathname: string) {
  return pathname.split(/[?#]/)[0]
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  // Check if the current URL exactly matches the start of the provided URL
  if (url.startsWith(current + '/')) {
    return true
  }

  return false
}
