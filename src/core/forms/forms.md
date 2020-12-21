# Ajf Forms

Ajf uses a json-based format to describe forms, which is documented here.

The format is relatively low level; while it is possible to write forms as jsons by hand,
we provide a couple of tools that make the creation and maintenance of forms more user-friendly:

- Forms can be easily written in excel following the [xlsform standard](https://github.com/gnucoop/formconv#introduction-to-xlsforms)
  and then converted to ajf forms using the command line utility [formconv](https://github.com/gnucoop/formconv)
  or the online converter <https://formconv.herokuapp.com/>.
- The [form builder](https://dev-mat.ajf.rocks/form-builder) is available,
  which provides a graphical user interface for modifying ajf forms.

## Basic Syntax

Let's start by describing a simple example form:

	{
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "slide0",
				"label": "Personal Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "name",
						"label": "What's your name?",
						"nodeType": 0,
						"fieldType": 0
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "age",
						"label": "How old are you?",
						"nodeType": 0,
						"fieldType": 2
					}
				]
			},
			{
				"parent": 1,
				"id": 2,
				"name": "slide1",
				"label": "Pet Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 2,
						"id": 2001,
						"name": "pet_name",
						"label": "What's your pet's name?",
						"nodeType": 0,
						"fieldType": 0
					},
					{
						"parent": 2001,
						"id": 2002,
						"name": "pet_age",
						"label": "How old is it?",
						"nodeType": 0,
						"fieldType": 2
					}
				]
			}
		]
	}

You are encouraged to see how the above form is rendered by setting its form schema in the [Ajf Demo page](https://dev-app.ajf.rocks/mat-forms).

Ajf forms are composed of "nodes".
Nodes are most commonly slides (with nodeType 3) or fields (with nodeType 0);
other node types are described in the [Node Types section](#node-types).
The example form consists of two slides, each one containing two fields.

Fields also have a type.
In this form, we have text fields (fieldType 0) and numeric fields (fieldType 2);
many other [field types](#field-types) are available, to deal with different user inputs, like dates, files and multiple choice questions.

Every node has a "name" and a "label".
name is used as a string identifier of the node;
label is the text shown to the user when the form is rendered.

Every node also has a numerical "id" and a "parent".
id can be any positive number, as long as it's unique in the form.
parent typically refers to the id of the node immediately above
(this can be different in forms with [conditional branches](#conditional-branches)).
Note that, in the example, node 1002 has node 1001 as parent and not node 1.
The first slide in the form must have parent 0.

## Form Context

To each form instance is associated a context, which holds the value of the form fields, for the questions that have been answered.
The fields are referenced by name.
For the previous example, a context might be the object `{ pet_name: "Bobby", pet_age: 3 }`.

## Node Types

The following node types are available:

| type | name              | description  |
|------|-------------------|--------------|
|    0 | AjfField          | a form field |
|    1 | AjfFieldNodeLink  | TODO: what is this? |
|    2 | AjfNodeGroup      | a [group of nodes](#node-groups) |
|    3 | AjfSlide          | a slide      |
|    4 | AjfRepeatingSlide | a [slide which can be repeated](#repeating-slides) |

## Field Types

The following field types are available:

| type | name           | description  |
|------|----------------|--------------|
|    0 | String         | a text input |
|    1 | Text           | a text area  |
|    2 | Number         | a 64-bit floating-point number |
|    3 | Boolean        | a checkbox, stored as boolean |
|    4 | SingleChoice   | a [single-choice question](#choice-questions) |
|    5 | MultipleChoice | a [multiple-choice question](#choice-questions) |
|    6 | Formula        | a [formula](#formulas) |
|    7 | Empty          | inserts an [HTML note](#html-notes) in the form |
|    8 | Date           | just use DateInput (9) instead |
|    9 | DateInput      | a calendar to select a date |
|   10 | Time           | a time in 23:59 format |
|   11 | Table          | a [table](#tables) |
|   12 | Geolocation    | a GPS point  |
|   13 | Barcode        | allows scanning a barcode |
|   14 | File           | allows uploading a file |
|   15 | Image          | allows uploading an image |
|   16 | VideoUrl       | the url of a video |

## Choice Questions

The following form contains a single-choice question (fieldType 4) and a multiple-choice question (fieldType 5):

	{
		"choicesOrigins": [
			{
				"type": "fixed",
				"name": "foods",
				"choicesType": "string",
				"choices": [
					{
						"label": "Pizza",
						"value": "pizza"
					},
					{
						"label": "Pasta",
						"value": "pasta"
					},
					{
						"label": "Sushi",
						"value": "sushi"
					}
				]
			},
			{
				"type": "fixed",
				"name": "yes_no",
				"choicesType": "string",
				"choices": [
					{
						"label": "Yes",
						"value": "yes"
					},
					{
						"label": "No",
						"value": "no"
					}
				]
			}
		],
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "food_info",
				"label": "Food Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "hungry",
						"label": "Are you hungry?",
						"nodeType": 0,
						"fieldType": 4,
						"choicesOriginRef": "yes_no"
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "favorite_foods",
						"label": "Which food(s) do you like?",
						"nodeType": 0,
						"fieldType": 5,
						"choicesOriginRef": "foods"
					}
				]
			}
		]
	}

Again, you can run the form in the [Ajf Demo page](https://dev-app.ajf.rocks/mat-forms).

The lists of values for choice questions are defined in the "choicesOrigins" property of the form.
Every "choices origin" list has a name, which allows it to be referenced in the form fields with the "choicesOriginRef" property.

Each choice has a "label" and a "value".
The label is what the user sees when compiling the form, the value is what gets stored in the form context.
