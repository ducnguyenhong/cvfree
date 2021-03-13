import styled from 'styled-components'

export const CVDetailStyle = styled.div`
  // .div-top-left {
  //   clip-path: polygon(0 0, 100% 0%, 100% 90%, 50% 100%, 0 90%);
  // }
  .div-triangle-top-right {
    clip-path: polygon(0 0, 100% 32%, 100% 0);
  }
  .div-triangle-bottom-left {
    clip-path: polygon(0 100%, 100% 100%, 0 60%);
  }

  .metadata-root {
    .metadata-control {
      opacity: 0;
      visibility: hidden;
    }
    &:hover {
      .metadata-control {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .cv-page-2 {
    top: 1115px;
    left: -80px;
  }
  .cv-page-3 {
    top: 2230px;
    left: -80px;
  }
`
