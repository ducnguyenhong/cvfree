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

  .home-enterprise {
    .one-exp-now {
      &:hover {
        .one-exp-now-rotate {
          transform: rotate(135deg) !important;
        }
      }
    }
  }
`
