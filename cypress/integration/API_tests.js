
describe('Testing API', () => {

  it('Make a get request', () => {
    cy.request('http://localhost:1128/reviews')
      .should((response) => {
        expect(response.status).to.eq(200)
      })
  })

  it('Make a get request for a products reviews', () => {
    cy.request('http://localhost:1128/reviews/?product_id=40344&page=1&count=5&sort=helpfulness')
    .should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Make a get request for a products metaData', () => {
    cy.request('http://localhost:1128/reviews/meta/?product_id=40344')
    .should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Make a put request to mark review helpful', () => {
    cy.request('PUT', 'http://localhost:1128/reviews/40344/helpful')
    .should((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('Make a put request to mark review reported', () => {
    cy.request('PUT', 'http://localhost:1128/reviews/40344/helpful')
    .should((response) => {
      expect(response.status).to.eq(200)
    })
  })
})
