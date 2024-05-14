#!/bin/bash

# Function to get the total time spent for the current day
get_total_time() {
    # Get the current date
    current_date=$(date "+%Y-%m-%d")

    # Check if the current date is in the associative array
    if [[ "${!time_spent[@]}" =~ $current_date ]]; then
        echo "${time_spent[$current_date]}"
    else
        echo "0"
    fi
}

# Infinite loop to continuously monitor computer usage
while true; do
    # Get the current time
    current_time=$(date "+%H:%M:%S")

    # Get the current hour
    current_hour=$(date "+%H")

    # Check if the current hour is past 4pm (16:00)
    if [ $current_hour -ge 16 ]; then
        # Get the current date
        current_date=$(date "+%Y-%m-%d")

        # Get the total time spent for the current day
        total_time=$(get_total_time)

        # Increment the total time spent for the current day
        ((time_spent[$current_date]++))

        # Clear the screen
        clear

        # Print the ASCII table header
        printf "+--------------+------------------------+\n"
        printf "|   Date       | Total time spent (mins) |\n"
        printf "+--------------+------------------------+\n"

        # Print the ASCII table row with the updated time spent for the current day
        printf "| %-12s | %-22s |\n" "$current_date" "${time_spent[$current_date]}"
        printf "+--------------+------------------------+\n"
    fi

    # Sleep for 1 minute before checking again
    sleep 60
done
