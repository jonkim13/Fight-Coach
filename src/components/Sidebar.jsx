import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const navigate = useNavigate()
  const { hash } = useLocation()

  const items = [
    { label: 'Home',         to: '/dashboard#home'      },
    { label: 'Edit Profile', to: '/dashboard#edit'      },
    { label: 'Clips',        to: '/dashboard#clips'     },
    { label: 'Analyze Clips',to: '/dashboard#analyze'   },
    { label: 'Growth Chart', to: '/dashboard#growth'    },
    { label: 'Connect',      to: '/dashboard#connect'   },
  ]

  return (
    <nav className="sidebar">
      <ul>
        {items.map((i) => (
          <li
            key={i.label}
            className={hash === i.to.split('#')[1] ? 'active' : ''}
            onClick={() => navigate(i.to)}
          >
            {i.label}
          </li>
        ))}
      </ul>
    </nav>
  )
}