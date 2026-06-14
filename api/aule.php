<?php
header("Access-Control-Allow-Origin: https://usirooms.xyz");

if (isset($_GET['name']) && strlen($_GET['name']) > 0) {
    $name = trim(htmlspecialchars(addslashes($_GET['name'])));
} else {
    http_response_code(400);
    die('Error 400: bad request');
}

$guids = array(
    // red building
    "A-11" => "3f915d4c-4257-41a6-962d-7f3104f4811b",
    "A-12" => "c56501d5-ed56-4e21-9776-b21079f86184",
    "A-13" => "ae6e0982-0592-4e00-a8a2-f328ace22a3b",
    "A-14" => "7cc2dd7e-4279-4088-984e-55d11f4ec1d4",
    "A-21" => "17010043-e180-40fa-872e-0ea08c26fa37",
    "A-22" => "5326a5a2-3fcd-4c60-8cf2-d89e4b42d8ed",
    "A-23" => "45a3be36-8d8b-4cd6-8a93-807035ecd445",
    "A-24" => "3ac722a5-5567-4a68-ac65-0cc12bb6430b",
    "A-31" => "11a4a358-1074-4858-bad7-c6dcf5d00059",
    "A-32" => "258c1e34-0846-4944-a8ab-02f6c5157c82",
    "A-33" => "a1f63d4f-424f-4cec-b101-94bf4a6ddf56",
    "A-34" => "131942e0-349d-44e8-8222-c8749fc2913e",
    // black building
    "SI-003" => "a13e6459-0015-4672-b1ee-cfc044e1d5f5",
    "SI-004" => "db60d2c3-fbdd-4caf-8e2a-e7aceb165667",
    "SI-006" => "db06e2e2-d8d4-4ba8-bc87-3e427cf1be22",
    "SI-007" => "d734f901-aec4-4084-a62f-cb13f7c699da",
    "SI-008" => "b0413a66-746b-4464-aca8-5511549191d2",
    "SI-013" => "4cb4bd49-78a0-425e-8134-1ad3a9ab2ef3",
    "SI-015" => "32e34869-6b51-4f0f-857d-df5f46bdc468",
    // main building
    "250" => "bb551e1a-935f-4ff0-bbd1-bd27f8714ffa",
    "251" => "b123637b-93c7-4579-a50e-a34f03fa5961",
    "253" => "990de15e-2a82-4a71-a2d6-522e724c11cc",
    "254" => "16a6e8e3-358c-4e42-9d06-a8794f3f92cd",
    "354" => "5539e4de-bb4e-4621-a7a3-4cc917420036",
    "355" => "c3a7d87b-9062-450a-be5d-af84b8ce36ab",
    // east campus
    "A1.03" => "cc0d031a-d18a-4f3d-bfae-805964573d49",
    "A1.04" => "13f9999d-154c-44e4-bf25-62d92e8abec0",
    "A1.05" => "46b07dcc-4bef-42e7-b350-ec2543deb9ec",
    "A2.06" => "4b0e0e88-23a8-45fc-979c-fa37de69956b",
    "A2.07" => "a329dae1-ccc4-42b7-b497-0f946799ed77",
    "A2.08" => "ac877be1-3310-40a6-9c79-23b38ca9839b",
    "A3.07" => "cfb90318-0656-4ff3-a21b-b3c41aaf01b4",
    "A3.08" => "7575077c-3355-46c0-860b-e2fe89153b22",
    "A3.09" => "14eaf93c-6bde-4dbc-b6a5-8e8dd174cbb4",
    "A3.10" => "4cf0ac0a-1b9f-4abc-acb2-a0cfa7bc5d1c",
    "C1.03" => "3b657264-6ebf-4b16-aee4-71e8dc6574f1",
    "C1.04" => "296a3ce2-1101-45f9-9316-2337d8597e2c",
    "C1.05" => "68f88cfc-cdca-4f3d-b069-ef07774cf091",
    "D0.02" => "10e3770f-54cb-4b89-83af-2f34375cddf0",
    "D0.03" => "1f40fc5a-aaa1-4ef8-a0cc-c08ee3e82202",
    "D0.04" => "501788f3-6919-4c50-a173-54ecb073947f",
    "D0.06" => "574043a5-79f9-46dd-9fe8-67e96a725e20",
    "D0.10" => "d00e7c9c-8a1b-4abd-a556-d7fcfa1977a6",
    "D0.11" => "5a4e5e38-e359-40c7-b2ba-dbbb4bc63fbe",
    "D1.13" => "69370b0e-358a-43cc-9243-35d7b0965b7f",
    "D1.14" => "7d1affe2-747b-4e41-acec-51a7346e01ed",
    "D1.15" => "b1ff63e7-30a6-48a1-8988-4872f4f79542",
    "D2.19" => "59136f34-b999-4d92-8722-1baf7952390d",
    "D2.21" => "b4f85e78-bdb5-4363-9547-92a36e49bf45",
    "D3.01" => "2b195a8f-ca12-4eff-be4b-e9bc0baa8601",
    "D3.03" => "5134636d-a318-4bb9-a763-95f087107208",
    "D4.01" => "96f161d9-a237-4f44-a190-be4fbcc38279",
    "D4.08" => "3954ed80-42ea-41cf-904e-9de031e23f1a",
    "D5.01" => "85e55b17-defe-4fa2-afa0-f089f88e6888",
    "D5.03" => "cbb17563-d710-4974-93ea-00476eddb329",
    "TERR" => "a9795732-3eb6-4b5f-a212-a0accad01002"
);

// Use name-based URL for all rooms
$url = "https://aule.usi.ch/aule/View.aspx?name=" . $name;

set_error_handler(function () {
    http_response_code(500);
    die('Error 500: network problem');
});

$result = file_get_contents(
    $url,
    false
);

if (substr($result, 0, 13) == "non abilitato") {
    http_response_code(404);
    die('Error 404: given room doesn\'t exist');
} else {
    echo $result;
}

restore_error_handler();
