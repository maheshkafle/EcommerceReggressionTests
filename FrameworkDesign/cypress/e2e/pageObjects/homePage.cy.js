class HomePage{
    getEditBox(){
        return cy.get('.form-group input[name="name"]')
    }
    selectGender(){
        return cy.get('select')
    }

    getNameField(){
        return cy.get('h4 input.ng-pristine')
    }

    getNameAttribute(){
        return cy.get('.form-group input[name="name"]')
    }
    
    getEntreprenuerChckBox(){
        return cy.get("#inlineRadio3")
    }

    getShopTab(){
        return cy.get(".navbar-nav .nav-item:nth-child(2)")
    }
}

export default HomePage