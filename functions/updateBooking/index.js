// Som en gäst vill jag kunna ändra min bokning ifall mina planer ändras.

exports.handler = async (event, context) => {
  console.log('Hello, world!');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, world!' }),
  };
};
