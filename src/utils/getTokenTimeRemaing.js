export default function getTokenTimeRemaining(decodedToken) {
  const now = new Date().getTime() / 1000;
  const diff = decodedToken.exp - now;
 
}
