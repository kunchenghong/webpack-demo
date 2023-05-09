const getString = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world!!')
    }, 2000)
  })
}

export default async function helloWorld(){
  const value = await getString()
  console.log(value)
}