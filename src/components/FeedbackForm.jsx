import { useState } from "react";
import { AlertTriangle, Image as ImageIcon } from "lucide-react";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length > 200) {
      setError("200자를 초과할 수 없습니다.");
    } else {
      setError("");
      setText(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // 미리보기용
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-4 rounded-2xl shadow-lg border text-left relative">
      {/* 사진 업로드 아이콘 */}
      <label htmlFor="imageUpload" className="absolute top-3 right-3 cursor-pointer">
        <ImageIcon className="w-5 h-5 text-yellow-500" />
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* 입력 필드 */}
      <textarea
        value={text}
        onChange={handleTextChange}
        rows={4}
        placeholder="피드백을 입력하세요 (최대 200자)"
        className="w-full resize-none border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* 이미지 미리보기 */}
      {image && (
        <img src={image} alt="업로드한 이미지" className="mt-3 rounded-xl max-h-48 object-contain" />
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="text-red-500 text-sm mt-1 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        disabled={text.length === 0 || text.length > 200}
        className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-xl disabled:opacity-50"
      >
        제출하기
      </button>
    </div>
  );
}