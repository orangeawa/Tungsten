// ====== Navigation Types ======
import type { Component } from 'vue'
// group
export interface NavGroup {
  groupName: string
  links: NavLinkItem[]
}
// item
export type NavLinkItem = (
  | NavLinkRouter
  | NavLinkA
  | NavLinkComponents
    )
interface NavLinkMeta {
  name: string
  icon?: string
}
interface NavLinkRouter extends NavLinkMeta {
  type: 'router'
  to: string
}
interface NavLinkA extends NavLinkMeta {
  type: 'a'
  url: string
}
interface NavLinkComponents extends NavLinkMeta {
  type: 'components'
  component: Component
}
