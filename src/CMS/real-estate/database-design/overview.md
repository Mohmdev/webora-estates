# Real Estate Database Design Overview

## Requirements

1. Capture information about properties: address, type of property, size of property, size of the block for the house, number of bedrooms and bathrooms and car spaces, and a description

2. Property can be marked as for sale or for rent, and has a process of not yet listed, then listed, then under offer, then sold or leased

3. A property can have either a sale price or a monthly lease amount when it is listed

4. A property can have a range of features such as included washing machine and dryer, garage, carport, front gate, and alarm system

5. It's possible for a property to go through the process multiple times, such as getting sold and then leased.

6.A property can have one or more employees working on the property being listed, in different roles such as property manager or selling agent, over different time periods.
- An employee can have different roles on different listings.

7. For employees, we want to know their first and last name, the date they started, the date they left the company if they have left, and their job title

8. A property can have multiple inspections while it is for sale or for lease, each of which has a date and time and an employee.

9. We want to capture information about potential clients:
- their name
- email address
- phone number
- which properties they may be interested in
- which properties they have attended an inspection for

10. We want to capture the properties that a client has applied for rent or made an offer to buy.
- An offer can be made on a property that is currently listed for sale or for lease.
- The offer can be accepted or rejected and multiple offers can be made on the same property and by the same person.

11. When a property is sold or leased, we want to store the details of the contract and transaction, including:
- the type of contract (sale or rent)
- a link to the actual contract
- the clients involved in the contract and their role
- the employee involved in the contract
- the date the contract is signed
- the start and end date of the contract (used for rentals)
- the status of the contract


## A client is two people?

Multiple inspections for an inspection or a contract?

Interest - Inspection - Offer - Contract, could be a process

These appear to be questions or notes about clarifying aspects of the property management system requirements.