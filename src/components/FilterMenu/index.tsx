'use client'

import './styles.scss'

import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import { RiArrowDownSLine } from 'react-icons/ri'
import { SORT_OPTIONS } from './options'

interface IFilterMenuProps {
  title: string
}

export default function FilterMenu({ title }: IFilterMenuProps) {
  function handleChangeSort(sortType: string) {
    alert(sortType)
  }

  return (
    <div className="bookmark_filter">
      <p>{title}</p>
      <Menu>
        <MenuButton>
          <RiArrowDownSLine />
        </MenuButton>
        <MenuList>
          {SORT_OPTIONS.map(option => (
            <MenuItem
              key={option.value}
              onSelect={() => handleChangeSort(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  )
}
