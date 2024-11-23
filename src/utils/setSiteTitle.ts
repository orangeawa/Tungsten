export function setSiteTitle(title = ''): void {
  document.title = `${title + (title && ' - ')}PatchyVideo Tungsten`
}
