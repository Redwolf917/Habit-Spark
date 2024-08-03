// assets/js/script.js

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the elements we'll be working with
    // Get reference to the "Spark a new Habit" button
    const startHabitButton = document.getElementById('start-habit');
    // Get reference to the habit form section
    const habitForm = document.getElementById('habit-form');
    // Get reference to the habit type dropdown
    const habitTypeSelect = document.getElementById('habit-type');
    // Get reference to the workout inputs section
    const workoutInputs = document.getElementById('workout-inputs');
    // Get reference to the schedule list
    const scheduleList = document.getElementById('schedule-list');

    // Add event listener to the "Spark a new Habit" button
    startHabitButton.addEventListener('click', () => {
        // Show the habit form when the button is clicked
        habitForm.style.display = 'block';
    });

    // Add event listener to the habit type dropdown
    habitTypeSelect.addEventListener('change', () => {
        // Show workout inputs if "exercise" is selected, hide otherwise
        if (habitTypeSelect.value === 'exercise') {
            workoutInputs.style.display = 'block';
            // Call function to fetch exercises from ExerciseDB API
            fetchExercises();
        } else {
            workoutInputs.style.display = 'none';
        }
    });

    // Add event listener to the habit selection form
    document.getElementById('habit-selection-form').addEventListener('submit', (event) => {
        event.preventDefault();
        // Call function to generate the schedule
        generateSchedule();
    });

    // Function to fetch exercises from ExerciseDB API
    function fetchExercises() {
        // Make an API request to fetch exercises
        // Use the fetched data to populate dropdowns for upper body, core, and lower body workouts
    }

    function generateSchedule() {
        // Get the habit title and type
        const habitTitle = document.getElementById('habit-title').value;
        const habitType = habitTypeSelect.value;

        // Check if habit title is provided and a valid type is selected
        if (!habitTitle || habitType === 'none') {
            alert('Please enter a habit title and select a habit type.');
            return;
        }

        // Logic to generate a 3-week workout schedule
        // Collect input values and create a schedule
        // Store the schedule in a variable

        const schedule = {
            title: habitTitle,
            type: habitType,
            // Add logic to collect and store workouts
        };

        // Save the schedule to localStorage
        saveSchedule(schedule);
        // Display the newly created schedule in the list
        displaySchedule(schedule);
    }

    function saveSchedule(schedule) {
        // Get existing schedules from localStorage
        const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
        // Add the new schedule to the array
        schedules.push(schedule);
        // Save the updated array back to localStorage
        localStorage.setItem('schedules', JSON.stringify(schedules));
    }

    function displaySchedule(schedule) {
        // Create a new list item for the schedule
        // Use Bootstrap class for list group item
        const scheduleItem = document.createElement('li');
        scheduleItem.classList.add('list-group-item');
        // Create a link element for the schedule title
        const scheduleLink = document.createElement('a');
        scheduleLink.href = '#';
        scheduleLink.textContent = schedule.title;
        // Add click event to view the schedule
        scheduleLink.addEventListener('click', () => {
            viewSchedule(schedule);
        });
        // Append the link to the list item
        scheduleItem.appendChild(scheduleLink);
        // Append the list item to the schedule list
        scheduleList.appendChild(scheduleItem);
    }

    function viewSchedule(schedule) {
        // Logic to display the selected schedule
        console.log('Viewing schedule:', schedule);
        // Implement the UI changes needed to show the schedule details
    }

    function loadSchedules() {
        // Load schedules from localStorage
        const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
        // Display each schedule in the list
        schedules.forEach(displaySchedule);
    }

    // Load schedules on page load
    loadSchedules();
});
