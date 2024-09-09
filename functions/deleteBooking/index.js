// Som en gäst vill jag kunna avboka mitt rum ifall jag inte längre kan komma.

exports.handler = async (event, context) => {
  console.log('Hello, world!');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, world!' }),
  };
};
