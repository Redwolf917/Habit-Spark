document.addEventListener('DOMContentLoaded', () => {
    // Get references to the elements we'll be working with
    const startHabitButton = document.getElementById('start-habit');
    const habitForm = document.getElementById('habit-form');
    const habitTypeSelect = document.getElementById('habit-type');
    const workoutInputs = document.getElementById('workout-inputs');
    const habitSelectionForm = document.getElementById('habit-selection-form');

    // Exercise dropdowns
    const upperBodyWorkouts = document.getElementById('upper-body-workouts');
    const coreWorkouts = document.getElementById('core-workouts');
    const lowerBodyWorkouts = document.getElementById('lower-body-workouts');

    // ExerciseDB API details
    const exerciseApiUrl = 'https://exercisedb.p.rapidapi.com/exercises';
    const exerciseApiHeaders = {
        'X-RapidAPI-Key': '98bdf7d642msh3034e16446b4b82p118f5fjsne270dacc81b4', // Replace with your actual RapidAPI key
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    };

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
            // Fetch exercises from ExerciseDB API
            fetchExercises();
        } else {
            workoutInputs.style.display = 'none';
        }
    });

    // Add event listener to the habit selection form
    habitSelectionForm.addEventListener('submit', (event) => {
        // Prevent default form submission
        event.preventDefault();
        // Call function to generate the schedule
        generateSchedule();
    });

    // Function to fetch exercises from ExerciseDB API
    async function fetchExercises() {
        try {
            const response = await fetch(exerciseApiUrl, {
                headers: exerciseApiHeaders
            });
            const exercises = await response.json();
            console.log('Fetched Exercises:', exercises); // Debugging: Check fetched data
            populateExerciseDropdowns(exercises);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    }

    // Function to populate exercise dropdowns with data from ExerciseDB API
    function populateExerciseDropdowns(exercises) {
        // Filter and populate upper body, core, and lower body workout dropdowns
        const upperBodyExercises = exercises.filter(ex => ex.bodyPart === 'upper arms' || ex.bodyPart === 'shoulders');
        const coreExercises = exercises.filter(ex => ex.bodyPart === 'waist');
        const lowerBodyExercises = exercises.filter(ex => ex.bodyPart === 'upper legs' || ex.bodyPart === 'lower legs');

        console.log('Upper Body Exercises:', upperBodyExercises); // Debugging: Check upper body exercises
        console.log('Core Exercises:', coreExercises); // Debugging: Check core exercises
        console.log('Lower Body Exercises:', lowerBodyExercises); // Debugging: Check lower body exercises

        populateDropdown(upperBodyWorkouts, upperBodyExercises);
        populateDropdown(coreWorkouts, coreExercises);
        populateDropdown(lowerBodyWorkouts, lowerBodyExercises);
    }

    function populateDropdown(workoutSection, exercises) {
        const selectElements = workoutSection.querySelectorAll('select');
        selectElements.forEach((select, index) => {
            if (index % 3 === 0) { // Only clear and populate the first select (workout names)
                select.innerHTML = ''; // Clear existing options
                exercises.forEach(exercise => {
                    const option = document.createElement('option');
                    option.value = exercise.name;
                    option.textContent = exercise.name;
                    select.appendChild(option);
                });
            }
        });
    }

    // Function to generate a workout schedule
    function generateSchedule() {
        // Get the habit title and type from the form inputs
        const habitTitle = document.getElementById('habit-title').value;
        const habitType = habitTypeSelect.value;

        // Check if habit title is provided and a valid type is selected
        if (!habitTitle || habitType === 'none') {
            alert('Please enter a habit title and select a habit type.');
            return;
        }

        // Collect workout input values and create a schedule object
        const schedule = {
            title: habitTitle,
            type: habitType,
            workouts: collectWorkouts()
        };

        // Save the schedule to localStorage
        saveSchedule(schedule);
        // Display the newly created schedule in the list
        displaySchedule(schedule);
    }

    function collectWorkouts() {
        const workouts = [];

        // Function to collect workouts from a specific section
        function collectFromSection(section) {
            const entries = section.querySelectorAll('.workout-entry');
            entries.forEach(entry => {
                const workoutName = entry.querySelector('select').value;
                const repsOrSeconds = entry.querySelectorAll('select')[1].value;
                const value = entry.querySelectorAll('input')[0].value;
                workouts.push({ workoutName, repsOrSeconds, value });
            });
        }

        collectFromSection(upperBodyWorkouts);
        collectFromSection(coreWorkouts);
        collectFromSection(lowerBodyWorkouts);

        return workouts;
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
        const scheduleList = document.getElementById('schedule-list');
        scheduleList.appendChild(scheduleItem);
    }

    function viewSchedule(schedule) {
        // Logic to display the selected schedule
        console.log('Viewing schedule:', schedule);
        // Implement the UI changes needed to show the schedule details
    }

    // Load schedules on page load to display any previously saved schedules
    function loadSchedules() {
        const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
        schedules.forEach(displaySchedule);
    }

    loadSchedules();
});