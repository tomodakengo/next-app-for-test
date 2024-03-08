# What is this?

This is a sample site for testing a single page application.

# Technology Stacks

## Framework

- Next.js

## CSS Components

- Tailwind
  - daisyUI

# Application Specifications

## data-testid

Locators that are expected to be used in the test are assigned a data-testid.<br>
The dynamic Locator is assigned a specific prefix followed by an array index.

## Storage

All states are stored in local storage.<br>
Local storage must be deleted to return to the initial state.

If local storage does not exist, the default value is set.<br>
There may be a delay of about 1 second before the initial value is reflected.

## Applications

### Home

Not implemented

### Tasks

Local storage key is `tasks`.

You can add, edit, and delete tasks. In addition, you can see the progress of the task.

A task has two states: `Done(true)` and `Remaining(false)`.<br>
`Done` means the task is completed.<br>
`Remaining` means the task is NOT completed.

New tasks are added to the bottom of the list.

When the Done button is pressed, ✅ appears to the left of the task and a strikeout line appears above the text. If the task is Done, the Done button cannot be pressed.

Pressing the Edit button brings up a prompt dialog to edit the contents. Task returns to `Remaining`.

### Chat

Local storage key is `messages`.

You can send a message and get a reply.

Messages sent are displayed on the right side and replies are displayed on the left side.<br>
Whenever you send a message, you will get a reply.

The content of the reply is obtained from the following API.<br>
https://api.adviceslip.com/advice

### Other

Wait a little longer ♥️
