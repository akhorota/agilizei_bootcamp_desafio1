/// <reference types="cypress" />

let Chance =  require('chance');
let chance =  new Chance();

context('Cadastro', () => {
    it('Cadastrar um novo usuário', () => {

        ///- Acessar o site automation practice
        cy.visit('index.php');

        ///- Clicar no botão de Sign in
        cy.get('a[class=login]').click();

        ///- Preencher as informações de e-mail (não pode ser repetido)
        cy.get('input#email_create').type(chance.email());

        ///- Clicar no botão Create an Account
        cy.get('button#SubmitCreate').click();

        ///- Preencher as informações do formulário de cadastro
        
        let gender = chance.gender();
        let month = chance.month();

        // personal info
        if (gender == 'Male') {
            cy.get('input#id_gender1').check(); 
            cy.get('input#customer_firstname').type(chance.first({ gender: "male" })); 
        } else {
            cy.get('input#id_gender2').check(); 
            cy.get('input#customer_firstname').type(chance.first({ gender: "female" }));
        }

        cy.get('input#customer_lastname').type(chance.last()); 
        cy.get('input#passwd').type('12345');

        if (month == 'February') {
            cy.get('select#days').select(chance.natural({min: 1, max: 28}).toString());
        } else {
            cy.get('select#days').select(chance.natural({min: 1, max: 31}).toString());

        }
        cy.get('select#months').select(month);
        cy.get('select#years').select(chance.year({min: 1900, max: 2020}));

        // address
        cy.get('input#company').type(chance.company());
        cy.get('input#address1').type(chance.address());
        cy.get('input#city').type(chance.city());
        cy.get('select#id_country').select('United States');
        cy.get('select#id_state').select(chance.state({ country: 'us', full: true }));
        cy.get('input#postcode').type(chance.zip());
        cy.get('input#phone_mobile').type(chance.phone({formatted:false}));

        ///- Clicar no botão Register
        cy.get('button#submitAccount').click();

        ///- Validar que foi redirecionado para a url correta
        cy.url().should('contain', 'my-account');

        ///- Validar exibição do texto 'Welcome to your account'
        cy.get('p[class="info-account"]').should('contain', 'Welcome to your account');;
    });
});
