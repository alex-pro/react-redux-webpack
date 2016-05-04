import { prefixer } from '../config/prefixer'

export const styles = prefixer({
  main: {
    marginTop: 50
  },
  clearFix: {
    '&:after, &:before': {
      content: '""',
      display: 'table'
    },
    '&:after': {
      clear: 'both'
    }
  },
  active: {
    background: '#4b545f',
    cursor: 'pointer',
    '& a': {
      color: '#fff !important'
    }
  },
  navBar: {
    lineHeight: '50px',
    textTransform: 'uppercase',
    width: '100%',
    height: 50,
    fontSize: 14,
    position: 'fixed',
    textAlign: 'center',
    transform: 'translate3d(0, 0, 0)',
    top: 0,
    '& ul': {
      padding: 0,
      margin: 0,
      background: 'rgba(253, 253, 253, 0.95)',
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.17)',
      listStyle: 'none',
      '& li': {
        display: 'inline-block',
        '&:hover': {
          background: '#4b545f',
          cursor: 'pointer',
          '& a': {
            color: '#fff'
          }
        },
        '& a': {
          listStyle: 'none',
          textDecoration: 'none',
          padding: '0 1.5vw',
          display: 'inline-block',
          color: '#757575'
        }
      }
    }
  }
})
