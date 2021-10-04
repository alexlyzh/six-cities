import Main from '../main/main';

interface Props {
  cardsCount: number,
}

function App(props: Props): JSX.Element {
  const {cardsCount} = props;

  return <Main cardsCount={cardsCount}/>;
}

export default App;
