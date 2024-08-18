document.addEventListener('DOMContentLoaded', () => {
    const finishButton = document.getElementById('finish-button');

    finishButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect user input
        const workoutEntry = document.querySelector('.form-group');
        const name = workoutEntry.querySelector('select').value;
        const unit = workoutEntry.querySelectorAll('select')[1].value;
        const value = workoutEntry.querySelector('input').value;
        const cardioWorkout = { name, unit, value };

        // Store the data in localStorage
        localStorage.setItem('cardioWorkout', JSON.stringify(cardioWorkout));

        // Generate the schedule
        const schedule = generateSchedule();

        // Store the schedule in localStorage
        storeSchedule(schedule);

        // Create and download the schedule document
        downloadSchedule(schedule);

        // Clear the stored workouts
        localStorage.clear();

        // Redirect to the home page after finishing
        window.location.href = '../index.html';
    });

    function generateSchedule() {
        const upperBodyWorkouts = JSON.parse(localStorage.getItem('upperBodyWorkouts')) || [];
        const coreWorkouts = JSON.parse(localStorage.getItem('coreWorkouts')) || [];
        const lowerBodyWorkouts = JSON.parse(localStorage.getItem('lowerBodyWorkouts')) || [];
        const cardioWorkout = JSON.parse(localStorage.getItem('cardioWorkout')) || {};

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let schedule = "Habit Spark 3-Week Workout Schedule\n\n";

        for (let week = 1; week <= 3; week++) {
            schedule += `Week ${week}:\n`;
            schedule += `------------------------------------\n`;

            daysOfWeek.forEach((day, index) => {
                schedule += `${day}:\n`;

                if (day === 'Sunday') {
                    schedule += `  - Cardio: ${cardioWorkout.name} - ${cardioWorkout.value} ${cardioWorkout.unit}\n`;
                } else if (index % 2 === 0) { // Upper Body days
                    upperBodyWorkouts.forEach(workout => {
                        schedule += `  - ${workout.name}: ${workout.value} ${workout.unit}\n`;
                    });
                } else { // Core days
                    coreWorkouts.forEach(workout => {
                        schedule += `  - ${workout.name}: ${workout.value} ${workout.unit}\n`;
                    });
                }

                schedule += `\n`;
            });

            schedule += `------------------------------------\n\n`;
        }

        return schedule;
    }

    function storeSchedule(schedule) {
        const schedules = JSON.parse(localStorage.getItem('generatedSchedules')) || [];
        schedules.push(schedule);
        localStorage.setItem('generatedSchedules', JSON.stringify(schedules));
    }

    function downloadSchedule(schedule) {
        const blob = new Blob([schedule], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Habit_Spark_Schedule.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});
