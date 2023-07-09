import HomePage from "./pageObjects/homePage.cy"
import ProductsPage from "./pageObjects/productsPage.cy"

describe('Test', () => {
  before(()=>{
    //runs once before all tests in the block
    cy.log("Inside before function")

    //All setup related tasks should be done inside before hook
    cy.fixture('example').then((data)=>{
      //copying data var on right handside to left handside data and this.data makes it global i.e accessible in this whole class
      globalThis.data=data
    })
  })

  it('open child tab', () => {
    const homePage = new HomePage()
    const productsPage = new ProductsPage()
    cy.visit(Cypress.env('url')+'/angularpractice')
    homePage.getEditBox().type(globalThis.data.name)
    homePage.selectGender().select(globalThis.data.gender)
    homePage.getNameField().should('have.value', globalThis.data.name) //here have.value is similar to jquery value attribute
    homePage.getNameAttribute().should('have.attr', 'minlength', '2') //have.attr specifies name of attribute and similar to .attr jquery method
    homePage.getEntreprenuerChckBox().should('be.disabled')
    // cy.pause() Used for debugging
    homePage.getShopTab().click()
    globalThis.data.productName.forEach((el) => {
      cy.selectProduct(el)
    });
    productsPage.getCheckoutTab().click()
    let sum = 0
    cy.get("tr td:nth-child(4) strong").each(($el, index, $list)=>{
      const amount =$el.text()
      let expectedSum = amount.split(" ")
      expectedSum = expectedSum[1].trim()
      sum = Number(sum) + Number(expectedSum)
    }).then(()=>{
      cy.log(sum)
    })

    cy.get("h3 strong").then(($el)=>{
      const actualTot =$el.text()
      let actualSum = actualTot.split(" ")
      actualSum = actualSum[1].trim()
      actualSum = Number(actualSum)
      expect(actualSum).to.equal(sum)
    })

    cy.contains("Checkout").click()
    cy.get("#country").type("Austria")
    cy.wait(5000)
    cy.get(".suggestions > ul > li > a").click()
    cy.get("#checkbox2").click({force:true})
    cy.get("input[type='submit']").click()
    cy.get('.alert').should('contain.text', 'Success!')
    //Alternate way of line. 37
    cy.get('.alert').then( (el)=>{
      const actualText = el.text()
      cy.log(actualText)
      expect(actualText.includes("Success")).to.be.true
    })
  })
})