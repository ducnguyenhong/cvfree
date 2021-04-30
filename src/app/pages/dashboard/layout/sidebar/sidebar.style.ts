import styled from 'styled-components'

export const SidebarStyle = styled.div`
  #scrollbar {
    &:-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #1f2937;
    }

    &:-webkit-scrollbar {
      width: 6px;
      background-color: #1f2937;
    }

    &:-webkit-scrollbar-thumb {
      background-color: #626972;
      border-radius: 2px;
    }
  }
  #scrollbar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #1f2937;
  }

  #scrollbar::-webkit-scrollbar {
    width: 6px;
    background-color: #1f2937;
  }

  #scrollbar::-webkit-scrollbar-thumb {
    background-color: #626972;
    border-radius: 2px;
  }
`
