document.addEventListener('DOMContentLoaded', function() {
    const addRowBtn = document.getElementById('add-row');
    const clearBtn = document.getElementById('clear');
    const courseNameInput = document.getElementById('course-name');
    const dayCheckboxes = document.querySelectorAll('input[name="days"]');
    const tableBody = document.querySelector('#course-table tbody');

    addRowBtn.addEventListener('click', function() {
        const courseName = courseNameInput.value.trim();
        
        if (!courseName) {
            alert('Please enter a course name');
            courseNameInput.focus();
            return;
        }

        const newRow = document.createElement('tr');
        
        const courseCell = document.createElement('td');
        courseCell.textContent = courseName;
        newRow.appendChild(courseCell);
        
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        days.forEach(day => {
            const dayCell = document.createElement('td');
            dayCell.className = 'checkbox-cell';
            
            const isChecked = Array.from(dayCheckboxes).some(cb => 
                cb.value === day && cb.checked
            );
            
            dayCell.textContent = isChecked ? '☑' : '✗';
            newRow.appendChild(dayCell);
        });
        
        const rowCount = tableBody.children.length;
        if (rowCount % 2 === 1) {
            newRow.style.backgroundColor = 'var(--table-alt)';
        }
        
        tableBody.appendChild(newRow);
        
        clearForm();
        
        showFeedback('Course added successfully!', 'success');
    });

    clearBtn.addEventListener('click', function() {
        clearForm();
        showFeedback('Form cleared!', 'info');
    });

    function clearForm() {
        courseNameInput.value = '';
        dayCheckboxes.forEach(cb => cb.checked = false);
        courseNameInput.focus();
    }

    function showFeedback(message, type) {
        const existingFeedback = document.querySelector('.feedback-message');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        const feedback = document.createElement('div');
        feedback.className = `feedback-message feedback-${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background-color: ${type === 'success' ? '#28a745' : '#17a2b8'};
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => feedback.remove(), 300);
            }
        }, 3000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    courseNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addRowBtn.click();
        }
    });

    courseNameInput.focus();
});