document.addEventListener('DOMContentLoaded', () => {
    const startHabitButton = document.getElementById('start-habit');
    const habitForm = document.getElementById('habit-form');
    const habitTypeSelect = document.getElementById('habit-type');
    const nextButton = document.getElementById('next-button');
    const scheduleList = document.getElementById('schedule-list');

    // Load and display previously generated schedules
    loadSchedules();

    // Start a new habit
    startHabitButton.addEventListener('click', () => {
        habitForm.style.display = 'block';
    });

    // Handle "Next" button click
    nextButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        const habitType = habitTypeSelect.value;
        
        if (habitType === 'exercise') {
            window.location.href = 'pages/upper-body-workouts.html';
        } else if (habitType === 'none') {
            alert('No habit selected.');
            window.location.href = 'index.html';
        } else {
            alert('Please select a valid habit type.');
        }
    });

    function loadSchedules() {
        const schedules = JSON.parse(localStorage.getItem('generatedSchedules')) || [];
        scheduleList.innerHTML = ''; // Clear the list before adding items

        schedules.forEach((schedule, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `Schedule ${index + 1}`;
            li.addEventListener('click', () => {
                displaySchedule(schedule);
            });
            scheduleList.appendChild(li);
        });
    }

    function displaySchedule(schedule) {
        alert(schedule); // Replace this with a more sophisticated display method if needed
    }
});
