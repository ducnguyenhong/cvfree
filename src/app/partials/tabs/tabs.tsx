import { get } from 'lodash'
import queryString from 'query-string'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'

export interface TabsProps {
  title: string
  route: string
  component: React.ReactElement
  isActive: boolean
  icon: string
}

interface TabContentProps {
  arrayTabs: TabsProps[]
}

interface TabControlProps {
  arrayTabs: TabsProps[]
}

export const TabControl: React.FC<TabControlProps> = (props) => {
  const { arrayTabs } = props
  const parsed = queryString.parse(window.location.search)
  const currentTab = get(parsed, 'tab')

  return (
    <div>
      {arrayTabs &&
        arrayTabs.length > 0 &&
        arrayTabs.map((item) => {
          const { title, icon, route, isActive } = item
          if (!isActive) {
            return null
          }
          return (
            <Link
              to={`${window.location.pathname}?tab=${route}`}
              key={`tab_control_${item.title}`}
              className={`cursor-pointer block group hover:bg-blue-50 rounded py-4 duration-300 px-4 mb-2 ${
                route === currentTab ? 'bg-blue-50' : ''
              }`}
            >
              <i
                className={`${icon} mr-3 group-hover:text-blue-600 duration-300 ${
                  route === currentTab ? 'text-blue-600' : ''
                }`}
              />
              <span
                className={`font-medium group-hover:font-bold group-hover:text-blue-600 duration-300 text-md ${
                  route === currentTab ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {title}
              </span>
            </Link>
          )
        })}
    </div>
  )
}

export const TabContent: React.FC<TabContentProps> = (props) => {
  const { arrayTabs } = props
  const history = useHistory()
  const parsed = queryString.parse(window.location.search)
  const currentTab = get(parsed, 'tab')
  if (!currentTab) {
    history.replace(`${window.location.pathname}?tab=${arrayTabs[0].route}`)
  }

  return (
    <div>
      {arrayTabs &&
        arrayTabs.length > 0 &&
        arrayTabs.map((item) => {
          const { route, component } = item
          if (currentTab === route) {
            return <div key={`tab_content_${item.title}`}>{component}</div>
          }
          return null
        })}
    </div>
  )
}
