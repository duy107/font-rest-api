import { Editor } from "@tinymce/tinymce-react";

function Tinymce({ value, onChange, isEdit , showPlaceholder}) {
    const handleEditorChange = (content) => {
        if (onChange) {
            onChange(content);
        }
    };
    const tinymceDisabled = {
        pointerEvents: "none",
        opacity: 0.6,
    };

    return (
        <div style={!isEdit ? tinymceDisabled : {}}>
            <Editor
                apiKey="tihrs21x9fw91fnoun6a201r0ep6jujixdp8x6aq8hx6r7gq"
                value={value}
                onEditorChange={handleEditorChange}
                init={{
                    selector: '#basic-conf',
                    height: 300,
                    plugins: [
                        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                        'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
                        'table', 'emoticons', 'help'
                    ],
                    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                        'forecolor backcolor emoticons | help',
                    menu: {
                        favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
                    },
                    menubar: 'favs file edit view insert format tools table help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                    placeholder: ( showPlaceholder ? "Nhập đầy đủ thông tin bao gồm trình độ học vấn, kinh nghiệm làm việc, link project,..." : "")
                }}
            />
        </div>
    );
}

export default Tinymce;
