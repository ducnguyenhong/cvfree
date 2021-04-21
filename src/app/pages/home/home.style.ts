import styled from 'styled-components'

export const HomeStyle = styled.div`
  .home-intro {
    .rotate-parent {
      &:hover {
        i {
          transform: rotate(90deg);
        }
      }
    }
  }

  .home-feature {
    background-size: cover;
  }
`
