'use client'

import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'
import { RiArrowDownSLine } from 'react-icons/ri'
import { SORT_OPTIONS } from './options'

import '@reach/menu-button/styles.css'
import './styles.scss'

interface IFilterMenuProps {
  title: string
  sortRepos: (topic: string, sort: string) => Promise<void>
}

export default function FilterMenu({ title, sortRepos }: IFilterMenuProps) {
  function handleChangeSort(sortType: string) {
    alert(sortType)
    sortRepos(title, sortType)
  }

  return (
    <div className="bookmark_filter">
      <p>{`Top ${title}`}</p>
      <Menu>
        <MenuButton>
          <RiArrowDownSLine />
        </MenuButton>
        <MenuList>
          {SORT_OPTIONS.map(option => (
            <MenuItem
              key={option.value}
              onSelect={() => sortRepos(title, option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  )
}
