import styled from 'styled-components'

export const CVDetailStyle = styled.div`
  .div-triangle-top-right-1 {
    transform: rotate(20deg);
  }
  .div-triangle-bottom-left-1 {
    transform: rotate(20deg);
  }

  // 2
  .div-triagle-top-left-2 {
    transform: rotate(-40deg);
    width: 500px;
    height: 300px;
    top: 100px;
    left: 0px;
  }
  .div-top-left-2 {
    min-height: 300px;
  }
  .div-triangle-bottom-left-2 {
    transform: rotate(-20deg);
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
    top: 1000px;
    left: -100px;
  }
  .cv-page-3 {
    top: 2115px;
    left: -100px;
  }
`
