// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the elements we'll be working with
    // Get reference to the "Spark a new Habit" button using document.getElementById
    // Get reference to the habit form section using document.getElementById
    // Get reference to the habit type dropdown using document.getElementById
    // Get reference to the workout inputs section using document.getElementById
    // Get reference to the schedule list using document.getElementById

    // Add event listener to the "Spark a new Habit" button using addEventListener
    // When the button is clicked, display the habit form by changing its display style

    // Add event listener to the habit type dropdown using addEventListener
    // When the selected habit type changes, show or hide workout inputs based on the selected value
    // If "exercise" is selected, show the workout inputs and call fetchExercises to populate the dropdowns
    // Otherwise, hide the workout inputs

    // Add event listener to the habit selection form using addEventListener
    // Prevent default form submission
    // Call generateSchedule to create the workout schedule

    // Function to fetch exercises from ExerciseDB API
    // Make an API request to fetch exercises
    // Use the fetched data to populate dropdowns for upper body, core, and lower body workouts

    function generateSchedule() {
        // Get the habit title and type from the form inputs
        // If the habit title is not provided or the habit type is not valid, alert the user and return

        // Logic to generate a 3-week workout schedule
        // Collect input values and create a schedule object
        // Add logic to increase workout reps/seconds each week
        // Store the schedule in a variable

        // Call saveSchedule to save the schedule to localStorage
        // Call displaySchedule to show the newly created schedule in the list
    }

    function saveSchedule(schedule) {
        // Get existing schedules from localStorage
        // If there are no existing schedules, initialize an empty array
        // Add the new schedule to the array
        // Save the updated array back to localStorage
    }

    function displaySchedule(schedule) {
        // Create a new list item for the schedule
        // Use Bootstrap class for list group item
        // Create a link element for the schedule title
        // Add click event to view the schedule
        // Append the link to the list item
        // Append the list item to the schedule list
    }

    function viewSchedule(schedule) {
        // Logic to display the selected schedule
        // Implement the UI changes needed to show the schedule details
    }

    function loadSchedules() {
        // Load schedules from localStorage
        // If there are no schedules, initialize an empty array
        // Display each schedule in the list by calling displaySchedule
    }

    // Call loadSchedules on page load to display any previously saved schedules
});
