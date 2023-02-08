const puppeteer = require('puppeteer');
const fs = require('fs');

async function getTextFromSite() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.finep.gov.br/chamadas-publicas/chamadapublica/709');

  const text = await page.evaluate(() => {
    const nodeListc = Array.from(document.querySelectorAll('div')) 
    const divArray = [...nodeListc] 
    const textList = divArray.map(elem => elem.innerText)
    const text = textList[69]
//    console.log(text)
    return text
  });

  fs.writeFile('texto.json', JSON.stringify(text, null, 2), err => {
    if(err) throw new Error('deu ruim')

    console.log('deu bom')
  })  

  console.log(text);
  await browser.close();
}

getTextFromSite();