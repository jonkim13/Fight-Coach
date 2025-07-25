import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './DashboardSection.css'

export default function DashboardSection({ id, title, imageSrc, rightTitle }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (id === 'edit') {
      navigate('/edit-profile-page')
    } else {
      window.location.hash = id
    }
  }

  return (
    <section id={id} className="dashboard-section">
      <div className="section-content">
        <motion.div
          className="section-title"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          onClick={handleClick}
        >
          {title}
        </motion.div>

        <div className="image-wrapper">
          <motion.div
            className="color-block"
            style={{ backgroundImage: `url(${imageSrc})` }}
            initial={{ x: 200, scaleX: 0, opacity: 0 }}
            whileInView={{ x: 0, scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            className="bar-and-text"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="vertical-text">{rightTitle}</div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}