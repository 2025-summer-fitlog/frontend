import React, { useEffect, useState } from 'react';

const RecordEditor = ({ dailyData, onUpdate, onRefreshWeeklyMonthly }) => {
  const [memo, setMemo] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    if (dailyData) {
      setMemo(dailyData.memo || '');
      setPhotoUrls(dailyData.photoUrls || []);
      setWorkouts(dailyData.workouts || []);
    }
  }, [dailyData]);

  const statusMap = {
    COMPLETE: 'O',
    PARTIAL: '△',
    SKIPPED: 'X'
  };

  const reverseStatusMap = {
    O: 'COMPLETE',
    '△': 'PARTIAL',
    X: 'SKIPPED'
  };

  const handleSymbolClick = (index, symbol) => {
    const newWorkouts = [...workouts];
    newWorkouts[index].status = reverseStatusMap[symbol];
    setWorkouts(newWorkouts);
  };

  const handleWorkoutNameChange = (index, newName) => {
    const newWorkouts = [...workouts];
    newWorkouts[index].workoutName = newName;
    setWorkouts(newWorkouts);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotoFiles(prev => [...prev, ...files]);

    const readers = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setPhotoUrls(prev => [...prev, ...results]);
    });
  };

  const handleDeleteImage = (index) => {
    setPhotoUrls(prev => prev.filter((_, i) => i !== index));
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const fetchTodayData = async () => {
    const res = await fetch('https://fitlog-2025.duckdns.org/api/log/daily/today');
    const result = await res.json();
    onUpdate(result);
  };

  const handleCreate = async () => {
    if (workouts.length === 0 || workouts.some(w => !w.workoutName.trim())) {
      alert('모든 운동명은 필수 입력 항목입니다.');
      return;
    }

    const formData = new FormData();

    const payload = {
      date: new Date().toISOString().split('T')[0],
      memo,
      workouts
    };

    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    photoFiles.forEach(file => formData.append('images', file));

    try {
      const res = await fetch('https://fitlog-2025.duckdns.org/api/log/daily', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('기록 생성 실패');
      await fetchTodayData();
      onRefreshWeeklyMonthly();
      alert('기록이 저장되었습니다!');
    } catch (e) {
      console.error(e);
      alert('기록 저장 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async () => {
    if (!dailyData?.logId) {
      handleCreate();
      return;
    }

    const payload = {
      date: dailyData.date,
      memo,
      photoUrls,
      workouts
    };

    try {
      const response = await fetch(`https://fitlog-2025.duckdns.org/api/log/daily/${dailyData.logId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('수정 실패');

      await fetchTodayData();
      onRefreshWeeklyMonthly();
      alert('수정이 완료되었습니다.');
    } catch (e) {
      console.error(e);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('하루치 전체 기록을 삭제하시겠습니까?')) return;

    try {
      const res = await fetch('https://fitlog-2025.duckdns.org/api/log/records/all', {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('전체 삭제 실패');
      onUpdate(null);
      onRefreshWeeklyMonthly();
      alert('전체 기록이 삭제되었습니다.');
    } catch (err) {
      console.error(err);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="right">
      <h2 id="log-date">오늘</h2>
      <div className="record-memo-row">
        <div className="record-box">
          <ul>
            {workouts.map((w, idx) => (
              <li key={idx}>
                <input
                  type="text"
                  className="record-text"
                  value={w.workoutName}
                  onChange={(e) => handleWorkoutNameChange(idx, e.target.value)}
                />
                <span className="record-options">
                  {['O', '△', 'X'].map(s => (
                    <span
                      key={s}
                      className={statusMap[w.status] === s ? 'selected' : ''}
                      onClick={() => handleSymbolClick(idx, s)}>
                      {s}
                    </span>
                  ))}
                </span>
                <span
                  onClick={() => setWorkouts(workouts.filter((_, i) => i !== idx))}
                  style={{ marginLeft: '12px', fontWeight: 'bold', cursor: 'pointer', color: '#e74c3c', fontSize: '18px' }}
                >
                  삭제
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="memo-box">
          <div className="memo-input-wrapper">
            <div className="image-preview-in-memo">
              {photoUrls.map((src, idx) => (
                <div className="preview-wrapper" key={idx}>
                  <img src={src} alt="업로드 이미지" />
                  <button className="delete-image-btn" onClick={() => handleDeleteImage(idx)}>X</button>
                </div>
              ))}
            </div>
            <label className="photo-icon">
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: 'none' }} />
              <img src="https://cdn-icons-png.flaticon.com/512/685/685655.png" alt="사진 추가" />
            </label>
            <textarea
              className="memo-input"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="오늘의 운동 기록"
            />
          </div>
          <div className="btn-group">
            <button className="save-btn" onClick={handleSave}>저장</button>
            <button className="save-btn" onClick={handleDeleteAll}>전체 삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordEditor;