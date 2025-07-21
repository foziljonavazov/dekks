function creditCard() {
    return {
      ccNum: '',
      expiry: '',
      cvc: '',
      ccType: null,
      ccLength: 19,
      ccSecurity: 3,
  
      init() {
        this.updateCardType();
      },
  
      formatCreditCard() {
        // Remove all non-digits
        this.ccNum = this.ccNum.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        this.updateCardType();
      },
  
      updateCardType() {
        const rawNum = this.ccNum.replace(/\D/g, '');
        if (rawNum.startsWith('4')) {
          this.ccType = { name: 'Visa', code: 'visa', cvcLength: 3, length: 16 };
        } else if (/^5[1-5]/.test(rawNum)) {
          this.ccType = { name: 'MasterCard', code: 'mastercard', cvcLength: 3, length: 16 };
        } else if (/^3[47]/.test(rawNum)) {
          this.ccType = { name: 'American Express', code: 'amex', cvcLength: 4, length: 15 };
        } else if (rawNum.startsWith('6011')) {
          this.ccType = { name: 'Discover', code: 'discover', cvcLength: 3, length: 16 };
        } else {
          this.ccType = null;
        }
  
        // Dynamic max length
        this.ccLength = this.ccType?.length === 15 ? 17 : 19; // Includes spaces
        this.ccSecurity = this.ccType?.cvcLength || 3;
      },
  
      formatExpiryInput(event) {
        let value = this.expiry.replace(/\D/g, '');
  
        if (value.length > 2) {
          value = value.slice(0, 2) + ' / ' + value.slice(2, 6);
        }
  
        this.expiry = value;
      },
  
      submitPayment() {
        const rawCard = this.ccNum.replace(/\s/g, '').trim();
        const expiryValid = /^\d{2} \/ \d{4}$/.test(this.expiry);
        const cvcInput = document.getElementById("cvv");
        this.cvc = cvcInput?.value.trim();
  
        if (!rawCard || rawCard.length < 15 || !this.expiry || !this.cvc) {
          alert("Please fill out all fields correctly.");
          return;
        }
  
        if (!expiryValid) {
          alert("The validity period format is incorrect. Correct format: MM / YYYY");
          return;
        }
  
        alert("Payment was successful!");
        window.location.href = "../pro-product/pro-product.html";
      }
    }
  }
  