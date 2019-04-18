

const DescContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background: #5906A3;
height: 100vh;
width: 40%
`

const QuesContainer = styled.div`
display: flex;
// justify-content: center;
// align-items: center;
flex-direction: column;
height: 100vh;
width: 60%;
`

const HeaderText = styled.h1`
color: white !important;
font-size: ${props => fontSize(props.fSize)} !important;
`
const fontSize = (size) => {
    switch (size) {
        case 'large':
            return '4rem';
        case 'medium':
            return '2rem';
        case 'small':
            return '1.5rem';
        case 'tiny':
            return '.75rem';
        default:
            return '1rem';
    }
}

const QuizList = styled.ul`
    `
const ListItem = styled.li`
    padding: 10px;
    font-size: 1.5rem;
    margin: 0 0 20px 0;
    list-style-type: none;
    `
const ChoiceItem = styled.li`
    margin: 10px;
    font-size: 1rem;
    list-style-type: none;
    `
