function calculateCompound() {
    // Recupera i valori dall'input
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);
    const monthlyContribution = parseFloat(document.getElementById('monthly').value) || 0;
    
    // Validazione input
    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
        alert('Per favore, inserisci valori validi in tutti i campi obbligatori.');
        return;
    }
    
    // Formula interesse composto: A = P(1 + r/n)^(nt)
    // Con versamenti mensili: A = P(1+r)^t + PMT × [((1+r)^t - 1) / r]
    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    
    // Calcolo del capitale iniziale con interesse composto
    const principalCompounded = principal * Math.pow(1 + rate, years);
    
    // Calcolo dei versamenti mensili con interesse composto
    let monthlyCompounded = 0;
    if (monthlyContribution > 0 && monthlyRate > 0) {
        monthlyCompounded = monthlyContribution * 
            ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * 
            (1 + monthlyRate);
    } else if (monthlyContribution > 0) {
        monthlyCompounded = monthlyContribution * totalMonths;
    }
    
    // Totali
    const finalAmount = principalCompounded + monthlyCompounded;
    const totalInvested = principal + (monthlyContribution * totalMonths);
    const totalInterest = finalAmount - totalInvested;
    
    // Mostra i risultati
    document.getElementById('finalAmount').textContent = 
        '€ ' + finalAmount.toLocaleString('it-IT', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('totalInvested').textContent = 
        '€ ' + totalInvested.toLocaleString('it-IT', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('totalInterest').textContent = 
        '€ ' + totalInterest.toLocaleString('it-IT', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('results').classList.remove('hidden');
}

// Permette di premere Enter per calcolare
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('compoundForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateCompound();
        }
    });
});
