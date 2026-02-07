function getAdvice() {
    const nameInput = document.getElementById('name');
    const problemInput = document.getElementById('problem');
    
    const name = nameInput.value.trim();
    const problem = problemInput.value.trim();
    
    if (!name) {
        showAlert('Name Required', 'Please enter your name');
        shakeElement(nameInput);
        return;
    }
    
    if (!problem) {
        showAlert('Problem Required', 'Please describe your problem');
        shakeElement(problemInput);
        return;
    }
    
    showLoading(true);
    
    // Backend connection will go here
    connectToBackend(name, problem);
}

// This function will be called by your friend's backend
function connectToBackend(name, problem) {
    // Your friend's backend API call will go here
    // Example:
    // fetch('backend-url', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({name: name, problem: problem})
    // })
    // .then(response => response.json())
    // .then(data => {
    //     showLoading(false);
    //     showResultWindow(name, problem, data);
    // })
    
    // For now, just show empty result window
    setTimeout(() => {
        showLoading(false);
        showEmptyResultWindow(name, problem);
    }, 1000);
}

function showEmptyResultWindow(name, problem) {
    document.getElementById('resultName').textContent = name;
    document.getElementById('resultIssue').textContent = problem.toUpperCase();
    
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('resultWindow').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Keep empty states visible
    document.getElementById('medEmpty').style.display = 'flex';
    document.getElementById('eatEmpty').style.display = 'flex';
    document.getElementById('avoidEmpty').style.display = 'flex';
    
    // Hide data containers
    document.getElementById('medData').style.display = 'none';
    document.getElementById('eatData').style.display = 'none';
    document.getElementById('avoidData').style.display = 'none';
    
    // Clear any previous data
    document.getElementById('medData').textContent = '';
    document.getElementById('eatData').innerHTML = '';
    document.getElementById('avoidData').innerHTML = '';
}

// This function will be called when backend sends data
function updateWithBackendData(backendData) {
    // Hide empty states
    document.getElementById('medEmpty').style.display = 'none';
    document.getElementById('eatEmpty').style.display = 'none';
    document.getElementById('avoidEmpty').style.display = 'none';
    
    // Show data containers
    document.getElementById('medData').style.display = 'block';
    document.getElementById('eatData').style.display = 'block';
    document.getElementById('avoidData').style.display = 'block';
    
    // Update with backend data
    if (backendData.prescribedMedicine) {
        document.getElementById('medData').textContent = backendData.prescribedMedicine;
    }
    
    if (backendData.recommendedFoods && Array.isArray(backendData.recommendedFoods)) {
        const eatHTML = backendData.recommendedFoods.map(food => `<li>${food}</li>`).join('');
        document.getElementById('eatData').innerHTML = eatHTML;
    }
    
    if (backendData.foodsToAvoid && Array.isArray(backendData.foodsToAvoid)) {
        const avoidHTML = backendData.foodsToAvoid.map(food => `<li>${food}</li>`).join('');
        document.getElementById('avoidData').innerHTML = avoidHTML;
    }
}

function closeResult() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('resultWindow').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function saveReport() {
    alert('Report will be saved when backend is connected');
}

function showAlert(title, message) {
    document.getElementById('alert-title').textContent = title;
    document.getElementById('alert-msg').textContent = message;
    
    const alertBox = document.getElementById('alert');
    alertBox.style.display = 'flex';
    
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s';
    element.style.borderColor = '#ff6b6b';
    
    setTimeout(() => {
        element.style.animation = '';
        element.style.borderColor = '#6a11cb';
        element.focus();
    }, 500);
}

function showLoading(loading) {
    const btn = document.querySelector('.action-btn');
    const btnIcon = btn.querySelector('i');
    const btnText = btn.querySelector('span');
    
    if (loading) {
        btn.disabled = true;
        btnText.textContent = 'Getting Advice...';
        btnIcon.className = 'fas fa-spinner fa-spin';
    } else {
        btn.disabled = false;
        btnText.textContent = 'Get Medical Advice';
        btnIcon.className = 'fas fa-pills';
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    .fa-spinner.fa-spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

document.getElementById('name').addEventListener('focus', function() {
    this.parentElement.querySelector('.line').style.width = '100%';
});

document.getElementById('name').addEventListener('blur', function() {
    if (!this.value) {
        this.parentElement.querySelector('.line').style.width = '0';
    }
});

document.getElementById('problem').addEventListener('focus', function() {
    this.parentElement.querySelector('.line').style.width = '100%';
});

document.getElementById('problem').addEventListener('blur', function() {
    if (!this.value) {
        this.parentElement.querySelector('.line').style.width = '0';
    }
});

document.getElementById('overlay').addEventListener('click', closeResult);

window.onload = function() {
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 500);
};