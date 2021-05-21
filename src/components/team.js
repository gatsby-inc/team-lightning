import * as React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import * as styles from './team.module.css'

function Team({ mates }) {
  return (
    <div className={styles.team}>
      {mates.map(mate => (
        <GatsbyImage key={mate.name} alt={`Photo of ${mate.name}`} className={styles.mate} image={getImage(mate.image)}/>
      ))}
    </div>
  )
}

export const teamFragment = graphql`
  fragment TeamDetails on TeamJson {
    name
    image {
      childImageSharp {
        gatsbyImageData(layout: FIXED, width: 48)
      }
    }
  }
`

export { Team }