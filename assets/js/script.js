document.addEventListener('DOMContentLoaded', () => {
    const startHabitButton = document.getElementById('start-habit');
    const habitForm = document.getElementById('habit-form');
    const habitTypeSelect = document.getElementById('habit-type');
    const nextButton = document.getElementById('next-button');
    const scheduleList = document.getElementById('schedule-list');

    // Load and display previously generated schedules
    if (scheduleList) {
        loadSchedules();
    }

    // Start a new habit
    if (startHabitButton) {
        startHabitButton.addEventListener('click', () => {
            habitForm.style.display = 'block';
        });
    }

    // Handle "Next" button click
    if (nextButton) {
        nextButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission

            // Only access the habit title if the element exists
            const habitTitleElement = document.getElementById('habit-title');
            if (habitTitleElement) {
                const habitTitle = habitTitleElement.value; // Get the habit title
                localStorage.setItem('habitTitle', habitTitle); // Store the habit title in localStorage
            }

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
    }

    function loadSchedules() {
        const schedules = JSON.parse(localStorage.getItem('generatedSchedules')) || [];
        scheduleList.innerHTML = ''; // Clear the list before adding items

        schedules.forEach((scheduleObj, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            const scheduleName = document.createElement('span');
            scheduleName.textContent = scheduleObj.name || `Schedule ${index + 1}`;

            // Add click event to display the schedule details
            scheduleName.addEventListener('click', () => {
                displaySchedule(scheduleObj.content);
            });

            // Download button
            const downloadBtn = document.createElement('button');
            downloadBtn.classList.add('btn', 'btn-secondary', 'btn-sm', 'ml-2');
            downloadBtn.textContent = 'Download';
            downloadBtn.addEventListener('click', () => {
                downloadSchedule(scheduleObj.content, scheduleObj.name);
            });

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteSchedule(index);
            });

            li.appendChild(scheduleName);
            li.appendChild(downloadBtn);
            li.appendChild(deleteBtn);
            scheduleList.appendChild(li);
        });
    }

    function downloadSchedule(schedule, name) {
        const blob = new Blob([schedule], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name || 'Schedule'}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function deleteSchedule(index) {
        const schedules = JSON.parse(localStorage.getItem('generatedSchedules')) || [];
        schedules.splice(index, 1);
        localStorage.setItem('generatedSchedules', JSON.stringify(schedules));
        loadSchedules(); // Refresh the list
    }

    function displaySchedule(schedule) {
        alert(schedule); // Replace this with a more sophisticated display method if needed
    }
});
