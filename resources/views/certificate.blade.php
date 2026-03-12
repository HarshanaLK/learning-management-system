<!DOCTYPE html>
<html>
<head>
    <title>Certificate of Completion</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        .certificate {
            border: 5px solid #000;
            padding: 20px;
            margin: auto;
            width: 80%;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
        }
        .subtitle {
            font-size: 18px;
        }
        .content {
            margin-top: 20px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="title">Certificate of Completion</div>
        <div class="subtitle">{{ $course->title }}</div>
        <div class="content">
            This certifies that <strong>{{ $user->first_name }}</strong> has successfully completed the course
            <strong>{{ $course->title }}</strong> on {{ now()->format('F j, Y') }}.
        </div>
    </div>
</body>
</html>
